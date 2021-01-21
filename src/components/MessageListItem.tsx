import { gmail_v1 } from 'googleapis';
import { formatDistance } from 'date-fns';
import { FiClock, FiMail } from 'react-icons/fi';
import Link from 'next/link';
import { getHeaderValue } from 'utils/message';

interface Props {
  message: gmail_v1.Schema$Message;
}

interface From {
  name: string;
  email: string;
}

const fromRegex = /^(?<name>.*)\s<(?<email>.*)>$/;
const fromNameQuotesRegex = /"(.*)"/;

const parseFrom = (fromString: string): From => {
  const match = fromRegex.exec(fromString);
  const { name, email } = match.groups;
  const nameStripped = name.replace(fromNameQuotesRegex, '$1'); // Names with spaces are quoted
  return { name: nameStripped, email };
};

const MessageListItem: React.FC<Props> = ({ message }) => {
  const fromString = getHeaderValue(message, 'From');
  const from = parseFrom(fromString);

  const receivedDate = new Date(parseInt(message.internalDate, 10));
  const when = formatDistance(receivedDate, new Date(), {
    addSuffix: true,
  });
  const whenShort = when.replace(/^about /, '');

  return (
    <Link href={`/stack/${message.id}`}>
      <a className="grid gap-1 leading-none">
        <div className="inline-block font-bold text-blue-500">{from.name}</div>
        <h2 className="text-base font-semibold truncate">
          <span>{getHeaderValue(message, 'Subject')}</span>
          <span className="font-normal text-gray-400">
            {' '}
            - {message.snippet}
          </span>
        </h2>
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <span className="flex items-center space-x-1">
            <FiMail />
            <span className="">{from.email}</span>
          </span>
          <span className="flex items-center space-x-1">
            <FiClock />
            <time dateTime={receivedDate.toISOString()}>{whenShort}</time>
          </span>
        </div>
      </a>
    </Link>
  );
};

export default MessageListItem;
