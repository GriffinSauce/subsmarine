import useSWR from 'swr';
import MessageListItem from 'components/MessageListItem';
import fetcher from 'utils/fetcher';
import { ResponseData } from 'pages/api/email/messages';

const MessageList: React.FC = () => {
  const { data, error } = useSWR<ResponseData>('/api/email/messages', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

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
