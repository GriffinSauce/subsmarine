import { Email } from 'mailslurp-client';
import { pick } from 'lodash-es';
import { getEmail } from './api';

const previewKeys = <const>[
  'id',
  'userId',
  'inboxId',
  'to',
  'from',
  'sender',
  'headers',
  'subject',
  'bodyExcerpt',
  'createdAt',
  'read',
];

// Some headers are quite long (eg. DKIM-Signature) so only pick useful ones
const headerKeys = [
  'Subject',
  'Date',
  'From',
  'To',
  'Reply-To',
  'List-Unsubscribe',
  'Content-Type',
];

export type ExpandedEmailPreview = Pick<Email, typeof previewKeys[number]>;

/**
 * Picks some expanded data for rich previews
 */
const pickExpandedEmailKeys = async (
  email: Email,
): Promise<ExpandedEmailPreview> => ({
  ...pick(email, previewKeys),
  headers: pick(email.headers, headerKeys),
});

/**
 * The preview in the inbox is too limited, create an expanded preview
 */
export const getEmailPreview = async (
  emailId: string,
): Promise<ExpandedEmailPreview> => {
  const email = await getEmail(emailId); // Explore using getEmailCached to speed up email view
  return pickExpandedEmailKeys(email);
};
