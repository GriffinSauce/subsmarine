import { gmail_v1 } from 'googleapis';
import Link from 'next/link';
import { getSubject } from 'utils/message';

interface Props {
  message: gmail_v1.Schema$Message;
}

const MessageListItem: React.FC<Props> = ({ message }) => {
  return (
    <Link href={`/stack/${message.id}`}>
      <a>
        <h2>{getSubject(message)}</h2>
        <p>{message.snippet}</p>
      </a>
    </Link>
  );
};

export default MessageListItem;
