import { useQuery, UseQueryOptions } from 'react-query';
import fetcher from 'utils/fetcher';
import { ResponseData, ResponseError } from 'pages/api/inbox';
import { useUser } from '@auth0/nextjs-auth0';

const fetchMessages = (): Promise<ResponseData> => fetcher('/api/inbox');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useMessages(options: UseQueryOptions<ResponseData> = {}) {
  const { user } = useUser();
  const isAuthenticated = !!user;

  return useQuery<ResponseData, ResponseError>('inbox', fetchMessages, {
    ...options,
    enabled: isAuthenticated && options.enabled,
    staleTime: 1000 * 60, // ms
  });
}

export default useMessages;
