import { getSession } from 'next-auth/client';
import { gmail_v1 } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import { getMessage, modifyMessage, MessageFormat } from 'utils/gmail';

export interface ResponseData {
  message: gmail_v1.Schema$Message;
}

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

  const { accessToken } = session;
  const { id } = req.query;

  const message = await getMessage({
    accessToken,
    messageId: `${id}`,
    format: MessageFormat.Full,
  });

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
