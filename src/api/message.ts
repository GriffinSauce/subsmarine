import { useQuery, UseQueryOptions } from 'react-query';
import fetcher from 'utils/fetcher';
import { ResponseData } from 'pages/api/email/messages/[id]';

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
  options?: UseQueryOptions<ResponseData>,
) {
  return useQuery<ResponseData>(
    ['messages', id],
    () => fetchMessage({ id }),
    options,
  );
}
