import { getSession } from 'next-auth/client';
import { google } from 'googleapis';

export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(403).json({ error: 'Not authenticated' });
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

  const { id } = req.query;

  let message;
  try {
    const response = await gmail.users.messages.get({
      userId: 'me',
      id,
      format: 'FULL',
    });
    message = response.data;
  } catch (err) {
    throw new Error(`Error fetching message ${id} - ${err.message}`);
  }

  res.json({ message });
};
