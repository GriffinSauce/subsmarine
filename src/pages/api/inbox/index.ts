import { getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import Debug from 'debug';
import redisClient from 'utils/redisClient';
import { createInbox, getInbox } from 'utils/mail';
import { InboxDto } from 'mailslurp-client';

const debug = Debug('subsmarine:api:inbox');

enum ErrorMessage {
  Unauthenticated = 'unauthenticated',
  UnhandledError = 'unhandledError',
  InboxNotFound = 'inboxNotFound',
}

export interface ResponseData {
  inbox: InboxDto;
}

export interface ResponseError {
  error: ErrorMessage;
}

type ResponseDataOrError = ResponseData | ResponseError;

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataOrError>,
): Promise<void> => {
  const session = getSession(req, res);
  if (!session) {
    res.status(401).json({ error: ErrorMessage.Unauthenticated });
    return;
  }

  debug('fetching inbox');

  const { user } = session;
  const userId = user.sub;

  const inboxIdKey = `user:${userId}:inboxId`;
  const inboxId = await redisClient.get(inboxIdKey);

  if (!inboxId) {
    debug(`creating new inbox for user ${userId}`);
    const inbox = await createInbox({ userId });
    await redisClient.set(inboxIdKey, inbox.id);
    res.json({ inbox });
    return;
  }

  const inbox = await getInbox(inboxId);
  if (!inbox) {
    res.status(500).json({ error: ErrorMessage.InboxNotFound });
    return;
  }

  res.json({ inbox });
};
