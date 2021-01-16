import useSWR from 'swr';
import MessageListItem from './MessageListItem';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const MessageList = () => {
  const { data, error } = useSWR('/api/email/messages', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { messages } = data;
  return (
    <ul>
      {messages.map((message) => (
        <li>
          <MessageListItem message={message} />
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
