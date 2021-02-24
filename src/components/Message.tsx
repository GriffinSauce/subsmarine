import { IoReaderOutline } from 'react-icons/io5';
import MessageBody from 'components/MessageBody';
import Loader from 'components/Loader';
import useMessage from 'hooks/useMessage';
import useSetRead from 'hooks/useSetRead';
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

  if (isIdle)
    return (
      <div className="flex items-center justify-center flex-grow h-full">
        <IoReaderOutline className="mb-24 text-gray-200 text-8xl" />
      </div>
    );

  if (isLoading)
    return (
      <div className="flex items-center justify-center flex-grow h-full">
        <Loader />
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center flex-grow h-full">
        <span>Sorry, something went wrong.</span>
      </div>
    );

  const { message } = data;
  return (
    <>
      <h1 className="px-6 text-center h2">
        {getHeaderValue(message, 'Subject')}
      </h1>
      <hr className="mt-6" />
      <MessageBody message={message} />
    </>
  );
};

export default Message;
