import { Email, EmailPreview, InboxDto, MailSlurp } from 'mailslurp-client';
import { nanoid } from 'nanoid';
import promiseThrottle from 'p-throttle';

const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY });

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
  return mailslurp.getEmails(inboxId, {
    sort: 'DESC',
  });
};

// Avoid API limits
// https://www.mailslurp.com/guides/avoiding-api-rate-limits/
const getEmailThrottle = promiseThrottle({
  limit: 50, // Max is 150
  interval: 1000,
});

export const getEmail = getEmailThrottle(
  async (emailId: string): Promise<Email> => {
    return mailslurp.getEmail(emailId);
  },
);

export const markAsRead = async (options: {
  emailId: string;
  read: boolean;
}): Promise<EmailPreview> => {
  return mailslurp.emailController.markAsRead(options);
};
