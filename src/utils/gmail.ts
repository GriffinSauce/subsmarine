import { google, gmail_v1 } from 'googleapis';
import { MessageFormat } from 'types/gmail';

// Improve legibility with some short aliases
type Gmail = gmail_v1.Gmail;
type Label = gmail_v1.Schema$Label;
type Message = gmail_v1.Schema$Message;
type ModifyMessageRequest = gmail_v1.Schema$ModifyMessageRequest;

google.options({
  http2: true,
});

export const getGmailClient = ({
  accessToken,
}: {
  accessToken: string;
}): Gmail => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ID,
    process.env.GOOGLE_SECRET,
  );
  oauth2Client.setCredentials({
    access_token: accessToken,
  });
  return google.gmail({
    version: 'v1',
    auth: oauth2Client,
  });
};

export const getLabels = async ({
  accessToken,
}: {
  accessToken: string;
}): Promise<Label[]> => {
  const gmail = getGmailClient({ accessToken });

  let labels: Label[];
  try {
    const { data } = await gmail.users.labels.list({
      userId: 'me',
    });
    labels = data.labels;
  } catch (err) {
    console.error('err', err);
    throw new Error(`The API returned an error fetching labels: ${err}`);
  }

  return labels;
};

export const getNewsletterLabel = async ({
  accessToken,
}: {
  accessToken: string;
}): Promise<Label | undefined> => {
  const labels = await getLabels({ accessToken });

  if (!labels.length) {
    throw new Error('No labels found.');
  }

  return labels.find((label) => label.name === 'Newsletters');
};

export const getBaseMessages = async ({
  accessToken,
  labelId,
  maxResults,
}: {
  accessToken: string;
  labelId: string;
  maxResults: number;
}): Promise<Message[]> => {
  const gmail = getGmailClient({ accessToken });

  let messages: Message[];
  try {
    const { data } = await gmail.users.messages.list({
      userId: 'me',
      // labelIds is mistyped as an Array, cast to avoid opting out of the whole options type check
      labelIds: (labelId as unknown) as Array<string>,
      maxResults,
    });
    messages = data.messages;
    // data.nextPageToken
    // data.resultSizeEstimate
  } catch (err) {
    console.error('err', err);
    throw new Error('No messages found.');
  }

  return messages;
};

export const getMessage = async ({
  accessToken,
  messageId,
  format,
}: {
  accessToken: string;
  messageId: string;
  format: MessageFormat;
}): Promise<Message> => {
  const gmail = getGmailClient({ accessToken });

  let message: Message;
  try {
    const response = await gmail.users.messages.get({
      userId: 'me',
      id: messageId,
      format,
    });
    message = response.data;
  } catch (err) {
    throw new Error(`Error fetching message ${messageId} - ${err.message}`);
  }

  return message;
};

export const modifyMessage = async ({
  accessToken,
  messageId,
  update,
}: {
  accessToken: string;
  messageId: string;
  update: ModifyMessageRequest;
}): Promise<void> => {
  const gmail = getGmailClient({ accessToken });

  try {
    await gmail.users.messages.modify({
      userId: 'me',
      id: messageId,
      requestBody: update,
    });
  } catch (err) {
    throw new Error(`Error fetching message ${messageId} - ${err.message}`);
  }
};
