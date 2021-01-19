import MessageListItem from 'components/MessageListItem';
import { useMessages } from 'api';

const MessageList: React.FC = () => {
  const { isLoading, isError, data } = useMessages();

  if (isLoading) return <div>loading...</div>;

  if (isError) return <div>failed to load</div>;

  const { messages } = data;
  return (
    <ul>
      {messages.map((message) => (
        <li key={message.id}>
          <MessageListItem message={message} />
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
