import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMediaLayout } from 'use-media';
import { NextPage } from 'next';
import { FiChevronLeft } from 'react-icons/fi';
import Layout from 'components/Layout';
import MessageList from 'components/MessageList';
import Message from 'components/Message';

const Page: NextPage = () => {
  // Next.js does one render with empty params
  // this triggers a flash of the list on mobile even when a message is selected
  // TODO: use a hack? https://github.com/vercel/next.js/discussions/11484
  const router = useRouter();
  const params = (router.query.id as Array<string>) || []; // Catch-all is array
  const [id] = params;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isMobile = process.browser ? useMediaLayout({ maxWidth: 1024 }) : true;

  return (
    <Layout fullHeight={!isMobile}>
      <div className="container flex flex-col min-h-0 px-3 mx-auto space-y-3">
        <h1 className="h1">Stack</h1>
        {isMobile ? (
          <>
            {id ? (
              <>
                <Link href="/stack">
                  <a className="flex items-center self-start button-blue">
                    <FiChevronLeft /> Back to list
                  </a>
                </Link>
                <Message id={id} />
              </>
            ) : (
              <MessageList />
            )}
          </>
        ) : (
          <div className="flex flex-row min-h-0">
            <div className="w-1/3 min-h-0 p-2 -ml-2 overflow-y-scroll">
              <MessageList />
            </div>
            <div className="w-2/3 min-h-0 overflow-y-scroll border-l border-gray-200">
              <Message id={id} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Page;
