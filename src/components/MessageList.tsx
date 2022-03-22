import MessageListItem from 'components/MessageListItem';
import MessageListItemSkeleton from 'components/MessageListItemSkeleton';
import Repeat from 'components/Repeat';
import useMessages from 'hooks/useMessages';

const MessageList: React.FC = () => {
  const { isIdle, isLoading, isError, data } = useMessages();

  if (isError) return <div>Sorry, something went wrong.</div>;

  if (!data || isIdle || isLoading)
    return (
      <ul className="space-y-6">
        <Repeat length={12}>
          <li>
            <MessageListItemSkeleton />
          </li>
        </Repeat>
      </ul>
    );

  const { messages } = data;
  return (
    <ul className="space-y-6">
      {messages.map((message) => (
        <li key={message.id}>
          <MessageListItem message={message} />
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
