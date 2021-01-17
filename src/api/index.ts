import fetcher from 'utils/fetcher';
import { ResponseData as ReponseDataMessages } from 'pages/api/email/messages';
import { ResponseData as ResponseDataMessage } from 'pages/api/email/messages/[id]';

export const fetchMessages = (): Promise<ReponseDataMessages> =>
  fetcher<ReponseDataMessages>('/api/email/messages');

export const fetchMessage = ({
  id,
}: {
  id: string;
}): Promise<ResponseDataMessage> =>
  fetcher<ResponseDataMessage>(`/api/email/messages/${id}`);
