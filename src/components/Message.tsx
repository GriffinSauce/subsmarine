import MessageBody from 'components/MessageBody';
import { useMessage, useSetRead } from 'api';
import { getHeaderValue } from 'utils/message';

interface Props {
  id: string | undefined;
}

const Message: React.FC<Props> = ({ id }) => {
  const { isIdle, isLoading, isError, data } = useMessage(
    { id: `${id}` },
    {
      enabled: !!id,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );

  useSetRead(data?.message);

  if (isIdle) return <div>Select a message</div>;

  if (isLoading) return <div>loading...</div>;

  if (isError) return <div>failed to load</div>;

  const { message } = data;
  return (
    <>
      <h1 className="h2">{getHeaderValue(message, 'Subject')}</h1>
      <hr className="my-3" />
      <MessageBody message={message} />
    </>
  );
};

export default Message;
