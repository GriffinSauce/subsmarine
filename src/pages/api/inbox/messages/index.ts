import { getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import Debug from 'debug';
import makeCache from 'utils/makeCache';
import redisClient from 'utils/redisClient';
import { getEmails } from 'utils/mail';
import { EmailPreview } from 'mailslurp-client';

const debug = Debug('subsmarine:api:email:messages');

enum ErrorMessage {
  Unauthenticated = 'unauthenticated',
  UnhandledError = 'unhandledError',
}

export interface ResponseData {
  messages: EmailPreview[];
}

export interface ResponseError {
  error: ErrorMessage;
}

type ResponseDataOrError = ResponseData | ResponseError;

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataOrError>,
): Promise<void> => {
  const session = await getSession(req, res);
  if (!session) {
    res.status(401).json({ error: ErrorMessage.Unauthenticated });
    return;
  }

  debug('fetching messages');

  const { user } = session;
  const userId = user.sub;

  const inboxIdKey = `user:${userId}:inboxId`;
  const inboxId = await redisClient.get(inboxIdKey);

  if (!inboxId) {
    res.status(500).json({ error: 'noInbox' });
    return;
  }

  const messages = await getEmails(inboxId);

  res.json({ messages });
};
