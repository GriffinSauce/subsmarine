import { getSession } from '@auth0/nextjs-auth0';
import { orderBy } from 'lodash-es';
import { NextApiRequest, NextApiResponse } from 'next';
import Debug from 'debug';
import redisClient from 'utils/redisClient';
import {
  ExpandedEmailPreview,
  getEmails,
  getExpandedEmailPreview,
  getEmailCached,
} from 'utils/mail';

const debug = Debug('subsmarine:api:inbox:messages');

enum ErrorMessage {
  Unauthenticated = 'unauthenticated',
  UnhandledError = 'unhandledError',
  InboxNotFound = 'inboxNotFound',
}

export interface ResponseData {
  messages: ExpandedEmailPreview[];
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
    res.status(500).json({ error: ErrorMessage.InboxNotFound });
    return;
  }

  const messagePreviews = await getEmails(inboxId);
  const messagePreviewsSorted = orderBy(messagePreviews, 'createdAt', 'desc');

  const messages = await Promise.all(
    messagePreviewsSorted.map(async (messagePreview) => {
      const email = await getEmailCached({
        userId,
        emailId: messagePreview.id,
      });
      return getExpandedEmailPreview(email);
    }),
  );

  res.json({ messages });
};
