import { Email, EmailPreview, InboxDto, MailSlurp } from 'mailslurp-client';
import { nanoid } from 'nanoid';
import { pick } from 'lodash-es';
import makeCache from './makeCache';

const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY });

const expandedEmailPreviewKeys = <const>[
  'id',
  'userId',
  'inboxId',
  'to',
  'from',
  'sender',
  'headers',
  'subject',
  'body',
  'bodyExcerpt',
  'createdAt',
  'read',
];

export type ExpandedEmailPreview = Pick<
  Email,
  typeof expandedEmailPreviewKeys[number]
>;

export const createInbox = async ({
  userId,
}: {
  userId: string;
}): Promise<InboxDto> => {
  return mailslurp.createInboxWithOptions({
    emailAddress: `${nanoid()}@subsmarine.app`,
    description: `user:${userId}`,
  });
};

export const getInbox = async (inboxId: string): Promise<InboxDto> => {
  return mailslurp.getInbox(inboxId);
};

export const getEmails = async (inboxId: string): Promise<EmailPreview[]> => {
  return mailslurp.getEmails(inboxId);
};

/**
 * Picks some expanded data for rich previews
 */
export const getExpandedEmailPreview = async (
  email: Email,
): Promise<ExpandedEmailPreview> => pick(email, expandedEmailPreviewKeys);

export const getEmail = async (emailId: string): Promise<Email> => {
  return mailslurp.getEmail(emailId);
};

interface GetEmailParams {
  userId: string;
  emailId: string;
}

export const getEmailCached = makeCache<
  GetEmailParams,
  ReturnType<typeof getEmail>
>({
  generateKey: ({ userId, emailId }) => `user:${userId}:messages:${emailId}`,
  fetchFreshValue: ({ emailId }) => getEmail(emailId),
  ttl: 60 * 60 * 24, // One day in seconds,
});

export const markAsRead = async (options: {
  emailId: string;
  read: boolean;
}): Promise<EmailPreview> => {
  return mailslurp.emailController.markAsRead(options);
};
