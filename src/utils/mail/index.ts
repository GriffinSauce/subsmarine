import { Email } from 'mailslurp-client';
import { pick } from 'lodash-es';

export * from './api';
export * from './cache';

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
export const getExpandedEmailPreview = async (
  email: Email,
): Promise<ExpandedEmailPreview> => pick(email, expandedEmailPreviewKeys);
