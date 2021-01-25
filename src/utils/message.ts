import { gmail_v1 } from 'googleapis';
import base64url from 'base64url';
import DOMPurify from 'dompurify';
import { Label } from 'types/message';

const getHeader = (
  message: gmail_v1.Schema$Message,
  name: string,
): gmail_v1.Schema$MessagePartHeader | undefined =>
  message.payload.headers.find((header) => header.name === name);

export const getHeaderValue = (
  message: gmail_v1.Schema$Message,
  name: string,
): string | undefined => {
  const header = getHeader(message, name);
  return header?.value;
};

export const getBodyHTML = (message: gmail_v1.Schema$Message): string => {
  const htmlPart = message.payload.parts.find(
    (part) => part.mimeType === 'text/html',
  );
  const { data } = htmlPart.body;
  const dirtyHTML = base64url.decode(data);
  return DOMPurify.sanitize(dirtyHTML, { USE_PROFILES: { html: true } });
};

export const getIsRead = (message: gmail_v1.Schema$Message): boolean =>
  !message.labelIds.includes(Label.Unread);
