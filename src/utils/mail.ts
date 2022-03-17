import { EmailPreview, InboxDto, MailSlurp } from 'mailslurp-client';
import { nanoid } from 'nanoid';

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
  return mailslurp.getEmails(inboxId);
};
