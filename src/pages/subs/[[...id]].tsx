import { useMediaQuery } from 'react-responsive';
import { NextPage } from 'next';
import Layout from 'components/Layout';
import MessageList from 'components/MessageList';
import Message from 'components/Message';
import MessageListLoader from 'components/MessageListLoader';
import PullToRefresh from 'components/PullToRefresh';
import useIsMounted from 'hooks/useIsMounted';
import useSelectedMessageId from 'hooks/useSelectedMessageId';
import useRedirectUnauthenticated from 'hooks/useRedirectUnauthenticated';
import useMessages from 'hooks/useMessages';
import { BreakPoints } from 'types/theme';

const Page: NextPage = () => {
  useRedirectUnauthenticated('/');

  const messageId = useSelectedMessageId();
  const { refetch } = useMessages();

  const isMobile = useMediaQuery({ maxWidth: BreakPoints.lg });
  const isMounted = useIsMounted(); // Defer until hydrated so we know the layout and route params

  return (
    <Layout fullHeight={!isMobile} withFooter={false}>
      <div className="container flex flex-col flex-grow min-h-0 px-3 py-4 mx-auto space-y-3">
        {isMounted && (
          <>
            {isMobile ? (
              <>
                {messageId ? (
                  <Message id={messageId} />
                ) : (
                  <div className="relative min-h-0">
                    <PullToRefresh onPull={refetch}>
                      <MessageList />
                    </PullToRefresh>
                    <MessageListLoader />
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-row min-h-0 -mr-2">
                <div className="relative w-1/3 min-h-0 -ml-2 overflow-hidden">
                  <div className="h-full p-2 overflow-y-scroll scrollbar">
                    <MessageList />
                  </div>
                  <MessageListLoader />
                </div>
                <div className="w-2/3 min-h-0 overflow-y-scroll scrollbar">
                  <Message id={messageId} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Page;
