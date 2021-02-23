import { useRouter } from 'next/router';

const useSelectedMessageId = (): string | undefined => {
  // Next.js does one render with empty params
  // this triggers a flash of the list on mobile even when a message is selected
  // TODO: use a hack? https://github.com/vercel/next.js/discussions/11484
  const { query, pathname } = useRouter();

  if (pathname !== '/subs/[[...id]]') return undefined;

  const params = (query.id as Array<string>) || []; // Catch-all is array
  const [id] = params;
  return id;
};

export default useSelectedMessageId;
