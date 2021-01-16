import { gmail_v1 } from 'googleapis';
import base64url from 'base64url';
import DOMPurify from 'dompurify';

export const getSubject = (message: gmail_v1.Schema$Message): string =>
  message.payload.headers.find((header) => header.name === 'Subject').value;

export const getBodyHTML = (message: gmail_v1.Schema$Message): string => {
  const htmlPart = message.payload.parts.find(
    (part) => part.mimeType === 'text/html',
  );
  const { data } = htmlPart.body;
  const dirtyHTML = base64url.decode(data);
  return DOMPurify.sanitize(dirtyHTML, { USE_PROFILES: { html: true } });
};
