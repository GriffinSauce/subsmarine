import { MailSlurp } from 'mailslurp-client';

const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY });

export const createInbox = async () => {
  const inbox = await mailslurp.createInbox();
  console.log('inbox', inbox);
  return inbox;
};

export const getInbox = async (inboxId: string) => {
  const inbox = await mailslurp.getInbox(inboxId);
  console.log('inbox', inbox);
  return inbox;
};

export const getEmails = async (inboxId: string) => {
  const emails = await mailslurp.getEmails(inboxId);
  console.log('emails', emails);
  return emails;
};
