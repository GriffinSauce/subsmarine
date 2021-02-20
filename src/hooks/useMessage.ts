import { useSession } from 'next-auth/client';
import { useQuery, UseQueryOptions } from 'react-query';
import { ResponseData, ResponseError } from 'pages/api/email/messages/[id]';
import fetcher from 'utils/fetcher';

interface FetchMessageOptions {
  id: string;
}

const fetchMessage = ({ id }: FetchMessageOptions): Promise<ResponseData> =>
  fetcher(`/api/email/messages/${id}`);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useMessage(
  { id }: FetchMessageOptions,
  options: UseQueryOptions<ResponseData> = {},
) {
  const [session] = useSession();
  const isAuthenticated = !!session?.user;

  return useQuery<ResponseData, ResponseError>(
    ['messages', id],
    () => fetchMessage({ id }),
    {
      ...options,
      enabled: isAuthenticated && options.enabled,
    },
  );
}

export default useMessage;
