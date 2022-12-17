import { getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import Debug from 'debug';
import redisClient from 'utils/redisClient';
import {
  getEmails,
  getEmailPreviewCached,
  ExpandedEmailPreview,
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
  debug('fetching messages');

  const session = await getSession(req, res);
  if (!session) {
    res.status(401).json({ error: ErrorMessage.Unauthenticated });
    return;
  }

  const { user } = session;
  const userId = user.sub;

  const inboxIdKey = `user:${userId}:inboxId`;
  const inboxId = await redisClient.get(inboxIdKey);

  debug('fetching inbox', inboxId);

  if (!inboxId) {
    res.status(500).json({ error: ErrorMessage.InboxNotFound });
    return;
  }

  let messages = [];
  try {
    debug('fetching emails list');

    const emailsList = await getEmails(inboxId);

    messages = await Promise.all(
      emailsList.map(({ id }) =>
        getEmailPreviewCached({
          userId,
          emailId: id,
        }),
      ),
    );
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ error: ErrorMessage.UnhandledError });
    return;
  }

  debug('done');

  res.json({ messages });
};
