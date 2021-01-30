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
import redisClient from 'utils/redisClient';

const debug = Debug('api:email:messages');

google.options({
  http2: true,
});

export interface ResponseData {
  messages: gmail_v1.Schema$Message[];
}

const LABEL_CACHE_TTL_SECONDS = 60 * 60 * 24 * 7; // One week

const getNewsletterLabelCached = async ({
  userId,
  accessToken,
}): Promise<gmail_v1.Schema$Label> => {
  // If caching is abstracted be careful to escape key delimiters from input
  const key = `user:${userId}:labels:newsletter`;

  const cachedValue = await redisClient.get(key);

  if (cachedValue) {
    try {
      console.info(`Cache hit - ${key}`);
      return JSON.parse(cachedValue);
    } catch (err) {
      console.error(`Error parsing cached value ${err.message}`);
    }
  }

  const freshValue = await getNewsletterLabel({ accessToken });

  try {
    console.info(`Cache miss - ${key}`);
    await redisClient.set(key, JSON.stringify(freshValue));
    await redisClient.expire(key, LABEL_CACHE_TTL_SECONDS);
  } catch (err) {
    console.error(`Error saving value to cache ${err.message}`);
  }

  return freshValue;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
): Promise<void> => {
  let start = new Date().getTime();
  const logDelay = (msg) => {
    const now = new Date().getTime();
    console.log(`After +${now - start}ms - ${msg}`);
    start = now;
  };

  const session = await getSession({ req });
  if (!session) {
    // @ts-expect-error - TODO: find typing that works with swr
    res.status(403).json({ error: 'Not authenticated' });
    return;
  }

  logDelay('got session');

  const { accessToken, user } = session;

  // @ts-expect-error - user.id is missing on type
  const userId = user.id;

  const newsletterLabel = await getNewsletterLabelCached({
    userId,
    accessToken,
  });
  debug('Fetched label', newsletterLabel);

  logDelay('got label');

  const messages = await getBaseMessages({
    accessToken,
    labelId: newsletterLabel.id,
    maxResults: 50,
  });
  debug('Fetched message list');

  logDelay('got messages');

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

  logDelay('got full messages');

  res.json({ messages: messagesWithMeta });
};
