import { NextPage } from 'next';
import Layout from 'components/Layout';
import MessageList from 'components/MessageList';
import Message from 'components/Message';
import MessageListLoader from 'components/MessageListLoader';
import PullToRefresh from 'components/PullToRefresh';
import { Media } from 'components/Media';
import useSelectedMessageId from 'hooks/useSelectedMessageId';
import useRedirectUnauthenticated from 'hooks/useRedirectUnauthenticated';
import useMessages from 'hooks/useMessages';

const Page: NextPage = () => {
  useRedirectUnauthenticated('/');

  const messageId = useSelectedMessageId();
  const { refetch } = useMessages();

  return (
    <Layout className="lg:max-h-screen" withFooter={false}>
      <div className="container flex flex-col flex-grow min-h-0 px-3 py-4 mx-auto space-y-3">
        <Media lessThan="lg" className="relative min-h-0">
          {messageId ? (
            <Message id={messageId} />
          ) : (
            <>
              <PullToRefresh onPull={refetch}>
                <MessageList />
              </PullToRefresh>
              <MessageListLoader />
            </>
          )}
        </Media>
        <Media greaterThanOrEqual="lg" className="flex flex-row min-h-0 -mr-2">
          <div className="relative w-1/3 min-h-0 -ml-2 overflow-hidden">
            <div className="h-full p-2 overflow-y-scroll scrollbar">
              <MessageList />
            </div>
            <MessageListLoader />
          </div>
          <div className="w-2/3 min-h-0 overflow-y-scroll scrollbar">
            <Message id={messageId} />
          </div>
        </Media>
      </div>
    </Layout>
  );
};

export default Page;
