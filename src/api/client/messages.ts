import { useSession } from 'next-auth/client';
import { useQuery, UseQueryOptions } from 'react-query';
import fetcher from 'utils/fetcher';
import { ResponseData, ResponseError } from 'pages/api/email/messages';

export const fetchMessages = (): Promise<ResponseData> =>
  fetcher('/api/email/messages');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useMessages(options: UseQueryOptions<ResponseData> = {}) {
  const [session] = useSession();
  const isAuthenticated = !!session?.user;

  return useQuery<ResponseData, ResponseError>('messages', fetchMessages, {
    ...options,
    enabled: isAuthenticated && options.enabled,
  });
}
