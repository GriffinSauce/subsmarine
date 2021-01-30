import { getSession } from 'next-auth/client';
import { gmail_v1 } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import Debug from 'debug';
import {
  getNewsletterLabel,
  getBaseMessages,
  getMessage,
  MessageFormat,
} from 'utils/gmail';
import makeCache from 'utils/makeCache';

const debug = Debug('api:email:messages');

export interface ResponseData {
  messages: gmail_v1.Schema$Message[];
}

interface GetNewsletterLabelParams {
  userId: string;
  accessToken: string;
}

const getNewsletterLabelCached = makeCache<
  GetNewsletterLabelParams,
  ReturnType<typeof getNewsletterLabel>
>({
  generateKey: ({ userId }) => `user:${userId}:labels:newsletter`,
  fetchFreshValue: ({ accessToken }) => getNewsletterLabel({ accessToken }),
  ttl: 60 * 60 * 24 * 7, // One week in seconds,
});

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

  debug('fetching messages');

  const { accessToken, user } = session;

  // @ts-expect-error - user.id is missing on type
  const userId = user.id;

  const newsletterLabel = await getNewsletterLabelCached({
    userId,
    accessToken,
  });
  debug('fetched label', newsletterLabel);

  const messages = await getBaseMessages({
    accessToken,
    labelId: newsletterLabel.id,
    maxResults: 50,
  });
  debug('fetched message list');

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
