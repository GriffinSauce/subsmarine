export enum SystemLabelId {
  Unread = 'UNREAD',
  Important = 'IMPORTANT',
  CategoryUpdates = 'CATEGORY_UPDATES',
}

export enum MessageFormat {
  Minimal = 'MINIMAL', // Returns only email message ID and labels; does not return the email headers, body, or payload.
  Full = 'FULL', // Returns the full email message data with body content parsed in the payload field; the raw field is not used. Format cannot be used when accessing the api using the gmail.metadata scope.
  Raw = 'RAW', // Returns the full email message data with body content in the raw field as a base64url encoded string; the payload field is not used. Format cannot be used when accessing the api using the gmail.metadata scope.
  Metadata = 'METADATA', // Returns only email message ID, labels, and email headers.
}
