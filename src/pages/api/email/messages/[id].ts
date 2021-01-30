import { getSession } from 'next-auth/client';
import { gmail_v1 } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import { getMessage, modifyMessage, MessageFormat } from 'utils/gmail';
import makeCache from 'utils/makeCache';
import Debug from 'debug';

const debug = Debug('api:email:messages:id');

export interface ResponseData {
  message: gmail_v1.Schema$Message;
}

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
  res: NextApiResponse<ResponseData>,
): Promise<void> => {
  const session = await getSession({ req });
  if (!session) {
    // @ts-expect-error - TODO: find typing that works with swr
    res.status(403).json({ error: 'Not authenticated' });
    return;
  }

  const { accessToken, user } = session;

  // @ts-expect-error - user.id is missing on type
  const userId = user.id;
  const { id } = req.query;

  debug(`fetching message ${id}`);

  const message = await getMessageCached({
    userId,
    accessToken,
    messageId: `${id}`,
    format: MessageFormat.Full,
  });

  debug(`fetched message ${id}`);

  res.json({ message });
};

const handlePost = async (
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
  const { id } = req.query;

  await modifyMessage({
    accessToken,
    messageId: `${id}`,
    update: req.body,
  });

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
      res.status(405).end(); //Method Not Allowed
      break;
  }
};
