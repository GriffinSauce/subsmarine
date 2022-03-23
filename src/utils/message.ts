import DOMPurify from 'dompurify';
import { Email } from 'mailslurp-client';

// eslint-disable-next-line import/prefer-default-export
export const getBodyHTML = (message: Email): string => {
  const dirtyHTML = message.body;
  return DOMPurify.sanitize(dirtyHTML, { USE_PROFILES: { html: true } });
};
