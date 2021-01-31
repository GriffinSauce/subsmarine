import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import fetcher from 'utils/fetcher';
import { ResponseData } from 'pages/api/email/messages/[id]';
import { getIsRead } from 'utils/message';
import { SystemLabelId } from 'types/gmail';

interface FetchMessageOptions {
  id: string;
}

export const fetchMessage = ({
  id,
}: FetchMessageOptions): Promise<ResponseData> =>
  fetcher(`/api/email/messages/${id}`);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useMessage(
  { id }: FetchMessageOptions,
  options: UseQueryOptions<ResponseData> = {},
) {
  const [session] = useSession();
  const isAuthenticated = !!session?.user;

  return useQuery<ResponseData>(['messages', id], () => fetchMessage({ id }), {
    ...options,
    enabled: isAuthenticated && options.enabled,
  });
}

interface ModifyMessageOptions {
  id: string;
  update: Record<string, unknown>;
}

export const modifyMessage = ({
  id,
  update,
}: ModifyMessageOptions): Promise<ResponseData> =>
  fetcher(`/api/email/messages/${id}`, { method: 'POST', body: update });

export const useSetRead = (
  message: ResponseData['message'] | undefined,
): void => {
  const queryClient = useQueryClient();
  const [handledMessage, setHandledMessage] = useState<string | null>(null); // Prevent repeat posts

  useEffect(() => {
    const setRead = async (messageId: string) => {
      setHandledMessage(messageId);

      // Update message
      // Could use react-query useMutation for error handling
      await modifyMessage({
        id: messageId,
        update: { removeLabelIds: [SystemLabelId.Unread] },
      });

      // Invalidate message list (and refetch if visible)
      queryClient.invalidateQueries('messages');
    };

    const isHandled = message?.id === handledMessage;
    if (message && !isHandled && !getIsRead(message)) setRead(message?.id);
  }, [handledMessage, message, queryClient]);
};
