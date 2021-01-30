import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { NextPage } from 'next';
import { FiChevronLeft } from 'react-icons/fi';
import Logo from 'components/Logo';
import Layout from 'components/Layout';
import MessageList from 'components/MessageList';
import Message from 'components/Message';
import useIsMounted from 'utils/useIsMounted';
import useRedirectUnauthenticated from 'utils/useRedirectUnauthenticated';
import { BreakPoints } from 'types/theme';

const Page: NextPage = () => {
  useRedirectUnauthenticated('/');

  // Next.js does one render with empty params
  // this triggers a flash of the list on mobile even when a message is selected
  // TODO: use a hack? https://github.com/vercel/next.js/discussions/11484
  const router = useRouter();
  const params = (router.query.id as Array<string>) || []; // Catch-all is array
  const [id] = params;

  const isMobile = useMediaQuery({ maxWidth: BreakPoints.lg });

  // Defer until hyrdated so we know the layout and route params
  const isMounted = useIsMounted();

  return (
    <Layout fullHeight={!isMobile} withFooter={false}>
      <div className="container flex flex-col min-h-0 px-3 mx-auto space-y-3">
        <h1 className="flex flex-row items-center justify-start mt-6 space-x-3 h1">
          <Logo className="w-10" />
          <span>Subs</span>
        </h1>

        {isMounted ? (
          <>
            {isMobile ? (
              <>
                {id ? (
                  <>
                    <Link href="/subs">
                      <a className="flex items-center self-start button-blue">
                        <FiChevronLeft /> Back to list
                      </a>
                    </Link>
                    <Message id={id} />
                  </>
                ) : (
                  <div className="min-h-0">
                    <MessageList />
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-row min-h-0 -mr-2">
                <div className="w-1/3 min-h-0 p-2 -ml-2 overflow-y-scroll">
                  <MessageList />
                </div>
                <div className="w-2/3 min-h-0 overflow-y-scroll border-l border-gray-200">
                  <Message id={id} />
                </div>
              </div>
            )}
          </>
        ) : (
          <div>loading...</div>
        )}
      </div>
    </Layout>
  );
};

export default Page;
