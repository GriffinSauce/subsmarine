import { getSession } from '@auth0/nextjs-auth0';
import { gmail_v1 } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import { getMessage, modifyMessage, isAuthenticationError } from 'utils/gmail';
import { MessageFormat } from 'types/gmail';
import makeCache from 'utils/makeCache';
import Debug from 'debug';
import { getUserGoogleAccessToken } from 'utils/auth';

const debug = Debug('subsmarine:api:email:messages:id');

enum ErrorMessage {
  Unauthenticated = 'unauthenticated',
  UnhandledError = 'unhandledError',
}

export interface ResponseData {
  message: gmail_v1.Schema$Message;
}

export interface ResponseError {
  error: ErrorMessage;
}

type ResponseDataOrError = ResponseData | ResponseError;

interface GetMessageParams {
  userId: string;
  messageId: string;
  format: MessageFormat;
  accessToken: string;
}

const getMessageCached = makeCache<
  GetMessageParams,
  ReturnType<typeof getMessage>
>({
  generateKey: ({ userId, messageId, format }) =>
    `user:${userId}:messages:${messageId}:${format}`,
  fetchFreshValue: ({ accessToken, messageId, format }) =>
    getMessage({ accessToken, messageId, format }),
  ttl: 60 * 60 * 24, // One day in seconds,
});

const handleGet = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataOrError>,
): Promise<void> => {
  const session = await getSession(req, res);
  if (!session) {
    res.status(401).json({ error: ErrorMessage.Unauthenticated });
    return;
  }

  const { user } = session;
  const userId = user.sub;

  // TODO: error handling
  const { accessToken } = await getUserGoogleAccessToken({ userId });

  const { id } = req.query;

  debug(`fetching message ${id}`);

  let message;
  try {
    message = await getMessageCached({
      userId,
      accessToken,
      messageId: `${id}`,
      format: MessageFormat.Full,
    });
  } catch (error) {
    if (isAuthenticationError(error)) {
      res.status(401).json({ error: ErrorMessage.Unauthenticated });
      return;
    }
    console.error(`Error fetching message ${id} - ${error.message}`);
    res.status(500).json({ error: ErrorMessage.UnhandledError });
    return;
  }

  debug(`fetched message ${id}`);

  res.json({ message });
};

const handlePost = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataOrError>,
): Promise<void> => {
  const session = await getSession(req, res);
  if (!session) {
    res.status(403).json({ error: ErrorMessage.Unauthenticated });
    return;
  }

  const { user } = session;
  const userId = user.sub;

  // TODO: error handling
  const { accessToken } = await getUserGoogleAccessToken({ userId });

  const { id } = req.query;

  try {
    await modifyMessage({
      accessToken,
      messageId: `${id}`,
      update: req.body,
    });
  } catch (error) {
    if (isAuthenticationError(error)) {
      res.status(401).json({ error: ErrorMessage.Unauthenticated });
      return;
    }
    console.error(`Error modifying message ${id} - ${error.message}`);
    res.status(500).json({ error: ErrorMessage.UnhandledError });
    return;
  }

  res.status(204).end();
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
): Promise<void> => {
  switch (req.method) {
    case 'GET':
      await handleGet(req, res);
      break;
    case 'POST':
      await handlePost(req, res);
      break;
    default:
      res.status(405).end();
      break;
  }
};
