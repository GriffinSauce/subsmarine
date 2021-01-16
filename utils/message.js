import base64url from "base64url";
import DOMPurify from "dompurify";

export const getSubject = (message) =>
  message.payload.headers.find((header) => header.name === "Subject").value;

export const getBodyHTML = (message) => {
  const data = message.payload.parts.find(
    (part) => part.mimeType === "text/html"
  ).body.data;
  const dirtyHTML = base64url.decode(data);
  return DOMPurify.sanitize(dirtyHTML, { USE_PROFILES: { html: true } });
};
