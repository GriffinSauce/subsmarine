import { makeCache } from 'utils/cache';
import { getEmail } from './api';
import { getEmailPreview } from './preview';

interface GetEmailParams {
  userId: string;
  emailId: string;
}

type GetEmailReturn = Awaited<ReturnType<typeof getEmail>>;

export const { get: getEmailCached, invalidate: invalidateEmailCache } =
  makeCache<GetEmailParams, GetEmailReturn>({
    getFreshValue: ({ emailId }) => getEmail(emailId),
    generateKey: ({ userId, emailId }) => `user:${userId}:messages:${emailId}`,
    ttl: 60 * 60 * 24, // One day in seconds,
  });

interface GetEmailPreviewParams {
  userId: string;
  emailId: string;
}

type GetEmailPreviewReturn = Awaited<ReturnType<typeof getEmailPreview>>;

export const {
  get: getEmailPreviewCached,
  invalidate: invalidateEmailPreviewCache,
} = makeCache<GetEmailPreviewParams, GetEmailPreviewReturn>({
  getFreshValue: ({ emailId }) => getEmailPreview(emailId),
  generateKey: ({ userId, emailId }) => `user:${userId}:previews:${emailId}`,
  ttl: 60 * 60 * 24, // One day in seconds,
});
