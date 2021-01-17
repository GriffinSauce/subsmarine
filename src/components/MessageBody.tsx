import { gmail_v1 } from 'googleapis';
import { getBodyHTML } from 'utils/message';

interface Props {
  message: gmail_v1.Schema$Message;
}

const MessageBody: React.FC<Props> = ({ message }) => {
  return (
    <div
      className="border border-gray-300"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: getBodyHTML(message) }}
    />
  );
};

export default MessageBody;
