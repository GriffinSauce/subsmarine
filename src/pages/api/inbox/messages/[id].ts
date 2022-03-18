import { getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import Debug from 'debug';
import { getEmailCached, markAsRead } from 'utils/mail';
import { Email } from 'mailslurp-client';

const debug = Debug('subsmarine:api:email:messages:id');

enum ErrorMessage {
  Unauthenticated = 'unauthenticated',
  UnhandledError = 'unhandledError',
  UnhandledInput = 'unhandledInput',
}

export interface ResponseData {
  message: Email;
}

export interface ResponseError {
  error: ErrorMessage;
  details?: string;
}

type ResponseDataOrError = ResponseData | ResponseError;

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

  const { id } = req.query;

  debug(`fetching message ${id}`);

  let email: Email;
  try {
    email = await getEmailCached({
      userId,
      emailId: `${id}`,
    });
  } catch (error) {
    console.error(`Error fetching message ${id} - ${error.message}`);
    res.status(500).json({ error: ErrorMessage.UnhandledError });
    return;
  }

  debug(`fetched message ${id}`);

  res.json({ message: email });
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

  const { id } = req.query;

  const { read, ...rest } = req.body;

  if (Object.keys(rest).length) {
    res.status(400).json({
      error: ErrorMessage.UnhandledError,
      details: `Only 'read' is currently supported`,
    });
    return;
  }

  try {
    await markAsRead({
      emailId: `${id}`,
      read,
    });
  } catch (error) {
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
