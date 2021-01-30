import { getSession } from 'next-auth/client';
import { google, gmail_v1 } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import Debug from 'debug';
import {
  getNewsletterLabel,
  getBaseMessages,
  getMessage,
  MessageFormat,
} from 'utils/gmail';

const debug = Debug('api:email:messages');

google.options({
  http2: true,
});

export interface ResponseData {
  messages: gmail_v1.Schema$Message[];
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
): Promise<void> => {
  const session = await getSession({ req });
  if (!session) {
    // @ts-expect-error - TODO: find typing that works with swr
    res.status(403).json({ error: 'Not authenticated' });
    return;
  }

  const { accessToken } = session;

  const newsletterLabel = await getNewsletterLabel({ accessToken });
  debug('Fetched label', newsletterLabel);

  const messages = await getBaseMessages({
    accessToken,
    labelId: newsletterLabel.id,
    maxResults: 50,
  });
  debug('Fetched message list');

  // Add labels and headers to messages
  const messagesWithMeta: gmail_v1.Schema$Message[] = await Promise.all(
    messages.map((message) =>
      getMessage({
        accessToken,
        messageId: message.id,
        format: MessageFormat.Metadata,
      }),
    ),
  );

  res.json({ messages: messagesWithMeta });
};
