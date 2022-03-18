import makeCache from 'utils/makeCache';
import redisClient from 'utils/redisClient';
import { getEmail } from './api';

interface GetEmailParams {
  userId: string;
  emailId: string;
}

const generateEmailKey = ({ userId, emailId }: GetEmailParams) =>
  `user:${userId}:messages:${emailId}`;

export const getEmailCached = makeCache<
  GetEmailParams,
  ReturnType<typeof getEmail>
>({
  generateKey: generateEmailKey,
  fetchFreshValue: ({ emailId }) => getEmail(emailId),
  ttl: 60 * 60 * 24, // One day in seconds,
});

export const invalidateEmailCache = ({
  userId,
  emailId,
}: GetEmailParams): Promise<unknown> =>
  redisClient.del(generateEmailKey({ userId, emailId }));
