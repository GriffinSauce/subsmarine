// This is an example of how to access a session from an API route
import { getSession } from "next-auth/client";
const { google } = require("googleapis");

export default async (req, res) => {
  const session = await getSession({ req });
  console.log("session", session);

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ID,
    process.env.GOOGLE_SECRET,
    ""
  );
  oauth2Client.setCredentials({
    access_token: session.user.accessToken,
  });

  const gmail = google.gmail({
    version: "v1",
    auth: oauth2Client,
  });
  gmail.users.labels.list(
    {
      userId: "me",
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const labels = res.data.labels;
      if (labels.length) {
        console.log("Labels:");
        labels.forEach((label) => {
          console.log(`- ${label.name}`);
        });
      } else {
        console.log("No labels found.");
      }
    }
  );

  res.send(JSON.stringify(session, null, 2));
};
