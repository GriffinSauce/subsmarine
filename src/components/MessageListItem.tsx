import Link from 'next/link';
import { useRouter } from 'next/router';
import { formatDistance } from 'date-fns';
import { FiClock, FiMail, FiCheck } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import tailshake from 'tailshake';
import { ExpandedEmailPreview } from 'utils/mail';

interface Props {
  message: ExpandedEmailPreview;
}

const MessageListItem: React.FC<Props> = ({ message }) => {
  const router = useRouter();
  const params = (router.query.id as Array<string>) || []; // Catch-all is array
  const [id] = params;

  const isOpen = message.id === id;

  const receivedDate = new Date(message.createdAt);
  const when = formatDistance(receivedDate, new Date(), {
    addSuffix: true,
  });
  const whenShort = when.replace(/^about /, '');

  return (
    <Link href={`/subs/${message.id}`}>
      <a className="grid gap-1 leading-none text-left rounded focus:outline-none focus:ring ring-offset-4 ring-blue-200 dark:ring-gray-900 dark:ring-offset-blue-900">
        <div className="flex flex-row items-center space-x-2">
          <span
            className={tailshake(
              'inline-block font-bold text-blue-500 rounded',
              message.read && 'text-gray-500 font-semibold',
              isOpen &&
                'px-1 ring ring-blue-500 font-semibold bg-blue-500 text-white',
            )}
          >
            {message.sender.name}
          </span>
          {message.read ? (
            <FiCheck className="text-gray-400" />
          ) : (
            <HiSparkles className="text-yellow-400" />
          )}
        </div>
        <h2
          className={tailshake(
            'leading-normal	font-semibold truncate',
            isOpen && 'text-blue-700',
          )}
        >
          {message.subject}
        </h2>
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <span className="flex items-center space-x-1">
            <FiMail />
            <span className="">{message.sender.emailAddress}</span>
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
