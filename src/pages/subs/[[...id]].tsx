import { useMediaQuery } from 'react-responsive';
import { NextPage } from 'next';
import Logo from 'components/Logo';
import Layout from 'components/Layout';
import MessageList from 'components/MessageList';
import Message from 'components/Message';
import LoadingPill from 'components/LoadingPill';
import useIsMounted from 'hooks/useIsMounted';
import useRelaxedReset from 'hooks/useRelaxedReset';
import useSelectedMessageId from 'hooks/useSelectedMessageId';
import useRedirectUnauthenticated from 'hooks/useRedirectUnauthenticated';
import { BreakPoints } from 'types/theme';
import { motion, AnimatePresence } from 'framer-motion';
import { useMessagesIsFetching } from 'hooks/useMessages';

const Page: NextPage = () => {
  useRedirectUnauthenticated('/');

  const isLoading = useMessagesIsFetching();
  const showLoading = useRelaxedReset(isLoading, 50);

  const messageId = useSelectedMessageId();

  const isMobile = useMediaQuery({ maxWidth: BreakPoints.lg });
  const isMounted = useIsMounted(); // Defer until hyrdated so we know the layout and route params

  return (
    <Layout fullHeight={!isMobile} withFooter={false}>
      <div className="container flex flex-col flex-grow min-h-0 px-3 mx-auto space-y-3">
        <h1 className="flex flex-row items-center justify-start mt-6 space-x-3 h1">
          <Logo className="w-10" />
          <span>Subs</span>
        </h1>

        {isMounted && (
          <>
            {isMobile ? (
              <>
                {messageId ? (
                  <Message id={messageId} />
                ) : (
                  <div className="min-h-0">
                    <MessageList />
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-row min-h-0 -mr-2">
                <div className="w-1/3 min-h-0 p-2 -ml-2 overflow-y-scroll scrollbar">
                  <MessageList />
                </div>
                <div className="w-2/3 min-h-0 overflow-y-scroll scrollbar">
                  <Message id={messageId} />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {showLoading && (
          <motion.div
            className="fixed flex items-center justify-center w-full bottom-20"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
          >
            <LoadingPill />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Page;
