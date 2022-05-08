import Skeleton from 'react-loading-skeleton';

const MessageListItemSkeleton: React.FC = () => (
  <div className="grid gap-1 rounded text-left leading-none ring-blue-200 ring-offset-4 focus:outline-none focus:ring">
    <div className="flex flex-row items-center space-x-2">
      <span className="inline-block rounded font-bold text-blue-500">
        <Skeleton width={100} />
      </span>
    </div>
    <h2 className="truncate font-semibold leading-normal">
      <Skeleton width={250} />
    </h2>
    <div className="flex items-center space-x-2 text-xs text-gray-400">
      <Skeleton width={150} />
    </div>
  </div>
);

export default MessageListItemSkeleton;
