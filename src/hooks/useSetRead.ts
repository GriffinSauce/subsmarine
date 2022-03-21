import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { ResponseData } from 'pages/api/inbox/messages/[id]';
import fetcher from 'utils/fetcher';

interface ModifyMessageOptions {
  id: string;
  update: Record<string, unknown>;
}

const modifyMessage = ({
  id,
  update,
}: ModifyMessageOptions): Promise<ResponseData> =>
  fetcher(`/api/inbox/messages/${id}`, { method: 'POST', body: update });

const useSetRead = (message: ResponseData['message'] | undefined): void => {
  const queryClient = useQueryClient();
  const [handledMessage, setHandledMessage] = useState<string | null>(null); // Prevent repeat posts

  useEffect(() => {
    const setRead = async (messageId: string) => {
      setHandledMessage(messageId);

      // Update message
      // Could use react-query useMutation for error handling
      await modifyMessage({
        id: messageId,
        update: { read: true },
      });

      // Invalidate message list (and refetch if visible)
      queryClient.invalidateQueries('messages');
    };

    const isHandled = message?.id === handledMessage;
    if (message && !isHandled && !message.read) setRead(message?.id);
  }, [handledMessage, message, queryClient]);
};

export default useSetRead;
