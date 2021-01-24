import Link from 'next/link';
import { useRouter } from 'next/router';
import { gmail_v1 } from 'googleapis';
import { formatDistance } from 'date-fns';
import { FiClock, FiMail, FiCheck, FiSun } from 'react-icons/fi';
import { getHeaderValue, getIsRead } from 'utils/message';
import mergeClasses from 'utils/mergeClasses';

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
  const router = useRouter();
  const params = (router.query.id as Array<string>) || []; // Catch-all is array
  const [id] = params;

  const isOpen = message.id === id;

  const fromString = getHeaderValue(message, 'From');
  const from = parseFrom(fromString);

  const receivedDate = new Date(parseInt(message.internalDate, 10));
  const when = formatDistance(receivedDate, new Date(), {
    addSuffix: true,
  });
  const whenShort = when.replace(/^about /, '');

  const isRead = getIsRead(message);

  return (
    <Link href={`/stack/${message.id}`}>
      <a className="grid gap-1 leading-none text-left rounded focus:outline-none focus:ring ring-offset-4 ring-blue-200">
        <div className="flex flex-row items-center space-x-2">
          <span
            className={mergeClasses(
              'inline-block font-bold text-blue-500 rounded',
              isRead && 'text-gray-500',
              isOpen &&
                'px-1 ring ring-blue-500 font-semibold bg-blue-500 text-white',
            )}
          >
            {from.name}
          </span>
          {isRead ? <FiCheck /> : <FiSun />}
        </div>
        <h2
          className={mergeClasses(
            'leading-normal	font-semibold truncate',
            isOpen && 'text-blue-700',
          )}
        >
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
