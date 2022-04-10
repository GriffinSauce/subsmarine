import { NextPage } from 'next';
import Layout from 'components/Layout';
import MessageList from 'components/MessageList';
import Message from 'components/Message';
import MessageListLoader from 'components/MessageListLoader';
import { Media } from 'components/Media';
import useSelectedMessageId from 'hooks/useSelectedMessageId';
import useRedirectUnauthenticated from 'hooks/useRedirectUnauthenticated';

const Page: NextPage = () => {
  useRedirectUnauthenticated('/');

  const messageId = useSelectedMessageId();

  return (
    <Layout className="lg:max-h-screen" withFooter={false}>
      <div className="container mx-auto flex min-h-0 grow flex-col space-y-3 px-3 py-4">
        <Media lessThan="lg" className="relative min-h-0">
          {messageId ? <Message id={messageId} /> : <MessageList />}
        </Media>
        <Media greaterThanOrEqual="lg" className="-mr-2 flex min-h-0 flex-row">
          <div className="relative -ml-2 min-h-0 w-1/3 overflow-hidden">
            <div className="scrollbar h-full overflow-y-scroll p-2">
              <MessageList />
            </div>
            <MessageListLoader />
          </div>
          <div className="scrollbar min-h-0 w-2/3 overflow-y-scroll">
            <Message id={messageId} />
          </div>
        </Media>
      </div>
    </Layout>
  );
};

export default Page;
