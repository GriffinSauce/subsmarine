import { getSession } from "next-auth/client";
const { google } = require("googleapis");

export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(403).json({ error: "Not authenticated" });
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ID,
    process.env.GOOGLE_SECRET
  );
  oauth2Client.setCredentials({
    access_token: session.accessToken,
  });

  const gmail = google.gmail({
    version: "v1",
    auth: oauth2Client,
  });

  // Get newsletter label
  let labels;
  try {
    const { data } = await gmail.users.labels.list({
      userId: "me",
    });
    labels = data.labels;
  } catch (err) {
    console.error("err", err);
    throw new Error("The API returned an error fetching labels: " + err);
  }
  if (!labels.length) {
    throw new Error("No labels found.");
  }
  const newsletterLabel = labels.find((label) => label.name === "Newsletters");

  // Get messages with label
  let messages;
  try {
    const { data } = await gmail.users.messages.list({
      userId: "me",
      labelIds: newsletterLabel.id,
    });
    messages = data.messages;
    // data.nextPageToken
    // data.resultSizeEstimate
  } catch (err) {
    console.error("err", err);
    throw new Error("No messages found.");
  }

  // Add headers to messages
  const fullMessages = await Promise.all(
    messages.map(async (message) => {
      let data;
      try {
        const response = await gmail.users.messages.get({
          userId: "me",
          id: message.id,
          format: "METADATA",
        });
        data = response.data;
      } catch (err) {
        throw new Error(
          `Error fetching message ${message.id} - ${err.message}`
        );
      }
      const subjectHeader = data.payload.headers.find(
        (header) => header.name === "Subject"
      );
      return data;
    })
  );

  res.json({ messages: fullMessages });
};
