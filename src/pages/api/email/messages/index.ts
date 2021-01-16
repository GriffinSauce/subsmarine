import { getSession } from 'next-auth/client';
import { google, gmail_v1 } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';

export interface ResponseData {
  messages: gmail_v1.Schema$Message[];
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
): Promise<void> => {
  const session = await getSession({ req });
  if (!session) {
    res.status(403).json({ error: 'Not authenticated' });
    return;
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ID,
    process.env.GOOGLE_SECRET,
  );
  oauth2Client.setCredentials({
    access_token: session.accessToken,
  });

  const gmail = google.gmail({
    version: 'v1',
    auth: oauth2Client,
  });

  // Get newsletter label
  let labels: gmail_v1.Schema$Label[];
  try {
    const { data } = await gmail.users.labels.list({
      userId: 'me',
    });
    labels = data.labels;
  } catch (err) {
    console.error('err', err);
    throw new Error(`The API returned an error fetching labels: ${err}`);
  }
  if (!labels.length) {
    throw new Error('No labels found.');
  }
  const newsletterLabel = labels.find((label) => label.name === 'Newsletters');

  // Get messages by label
  let messages: gmail_v1.Schema$Message[];
  try {
    const { data } = await gmail.users.messages.list({
      userId: 'me',
      labelIds: [newsletterLabel.id],
    });
    messages = data.messages;
    // data.nextPageToken
    // data.resultSizeEstimate
  } catch (err) {
    console.error('err', err);
    throw new Error('No messages found.');
  }

  // Add headers to messages
  const fullMessages: gmail_v1.Schema$Message[] = await Promise.all(
    messages.map(async (message) => {
      let data: gmail_v1.Schema$Message;
      try {
        const response = await gmail.users.messages.get({
          userId: 'me',
          id: message.id,
          format: 'METADATA',
        });
        data = response.data;
      } catch (err) {
        throw new Error(
          `Error fetching message ${message.id} - ${err.message}`,
        );
      }
      return data;
    }),
  );

  res.json({ messages: fullMessages });
};
