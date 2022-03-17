import { useQuery, UseQueryOptions } from 'react-query';
import { ResponseData, ResponseError } from 'pages/api/inbox/messages/[id]';
import fetcher from 'utils/fetcher';
import { useUser } from '@auth0/nextjs-auth0';

interface FetchMessageOptions {
  id: string;
}

const fetchMessage = ({ id }: FetchMessageOptions): Promise<ResponseData> =>
  fetcher(`/api/inbox/messages/${id}`);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useMessage(
  { id }: FetchMessageOptions,
  options: UseQueryOptions<ResponseData> = {},
) {
  const { user } = useUser();
  const isAuthenticated = !!user;

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
