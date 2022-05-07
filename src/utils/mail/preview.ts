import { Email } from 'mailslurp-client';
import { pick } from 'lodash-es';
import { getEmail } from './api';

const expandedEmailPreviewKeys = <const>[
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

export type ExpandedEmailPreview = Pick<
  Email,
  typeof expandedEmailPreviewKeys[number]
>;

/**
 * Picks some expanded data for rich previews
 */
const pickExpandedEmailKeys = async (
  email: Email,
): Promise<ExpandedEmailPreview> => pick(email, expandedEmailPreviewKeys);

/**
 * The preview in the inbox is too limited, create an expanded preview
 */
export const getEmailPreview = async (
  emailId: string,
): Promise<ExpandedEmailPreview> => {
  const email = await getEmail(emailId); // Explore using getEmailCached to speed up email view
  return pickExpandedEmailKeys(email);
};
