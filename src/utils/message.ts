import DOMPurify from 'dompurify';
import { Email } from 'mailslurp-client';
import { ExpandedEmailPreview } from './mail';

export const getHeaderValue = (
  message: ExpandedEmailPreview,
  name: string,
): string | undefined => {
  return message.headers[name];
};

export const getBodyHTML = (message: Email): string => {
  const dirtyHTML = message.body;
  return DOMPurify.sanitize(dirtyHTML, { USE_PROFILES: { html: true } });
};
