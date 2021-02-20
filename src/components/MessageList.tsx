import MessageListItem from 'components/MessageListItem';
import useMessages from 'hooks/useMessages';

const MessageList: React.FC = () => {
  const { isIdle, isLoading, isError, data } = useMessages();

  if (isIdle || isLoading) return <div>loading...</div>;

  if (isError) return <div>failed to load</div>;

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
