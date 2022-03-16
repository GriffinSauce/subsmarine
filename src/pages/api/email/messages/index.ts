import { getSession } from '@auth0/nextjs-auth0';
import { gmail_v1 } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import Debug from 'debug';
import {
  getNewsletterLabel,
  getBaseMessages,
  getMessage,
  isAuthenticationError,
} from 'utils/gmail';
import { MessageFormat } from 'types/gmail';
import makeCache from 'utils/makeCache';
import redisClient from 'utils/redisClient';
import { getUserGoogleAccessToken } from 'utils/auth';
import { createInbox, getEmails, getInbox } from 'utils/mail';

const debug = Debug('subsmarine:api:email:messages');

enum ErrorMessage {
  Unauthenticated = 'unauthenticated',
  UnhandledError = 'unhandledError',
  LabelNotFound = 'labelNotFound',
}

export interface ResponseData {
  messages: gmail_v1.Schema$Message[];
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
  console.log('inboxId', inboxId);

  if (!inboxId) {
    const inbox = await createInbox();
    await redisClient.set(inboxIdKey, inbox.id);
    res.json({ inbox, messages: [] });
    return;
  }

  const inbox = await getInbox(inboxId);
  if (!inbox) {
    res.status(500).json({ error: 'inboxNotFound' });
    return;
  }

  const emails = await getEmails(inboxId);

  res.json({ inbox, messages: emails });
};
