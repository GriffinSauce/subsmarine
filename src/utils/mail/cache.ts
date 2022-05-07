import { makeCache, makeInvalidateCache } from 'utils/cache';
import { getEmail } from './api';
import { getEmailPreview } from './preview';

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

export const invalidateEmailCache = makeInvalidateCache<GetEmailParams>({
  generateKey: generateEmailKey,
});

interface GetEmailPreviewParams {
  userId: string;
  emailId: string;
}

const generateEmailPreviewKey = ({ userId, emailId }: GetEmailPreviewParams) =>
  `user:${userId}:previews:${emailId}`;

export const getEmailPreviewCached = makeCache<
  GetEmailPreviewParams,
  ReturnType<typeof getEmailPreview>
>({
  generateKey: generateEmailPreviewKey,
  fetchFreshValue: ({ emailId }) => getEmailPreview(emailId),
  ttl: 60 * 60 * 24, // One day in seconds,
});

export const invalidateEmailPreviewCache =
  makeInvalidateCache<GetEmailPreviewParams>({
    generateKey: generateEmailPreviewKey,
  });
