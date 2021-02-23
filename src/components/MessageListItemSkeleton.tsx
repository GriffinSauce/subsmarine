import Skeleton from 'react-loading-skeleton';

const MessageListItemSkeleton: React.FC = () => (
  <div className="grid gap-1 leading-none text-left rounded focus:outline-none focus:ring ring-offset-4 ring-blue-200">
    <div className="flex flex-row items-center space-x-2">
      <span className="inline-block font-bold text-blue-500 rounded">
        <Skeleton width={100} />
      </span>
    </div>
    <h2 className="font-semibold leading-normal truncate">
      <Skeleton width={250} />
    </h2>
    <div className="flex items-center space-x-2 text-xs text-gray-400">
      <Skeleton width={150} />
    </div>
  </div>
);

export default MessageListItemSkeleton;
