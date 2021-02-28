import LoadingPill from 'components/LoadingPill';
import { motion, AnimatePresence } from 'framer-motion';
import useMessages from 'hooks/useMessages';
import useRelaxedReset from 'hooks/useRelaxedReset';

const MessageListLoader: React.FC = () => {
  const { data, isFetching } = useMessages();
  const isRefetching = data && isFetching;

  const showLoading = useRelaxedReset(isRefetching, 50);

  return (
    <AnimatePresence>
      {showLoading && (
        <motion.div
          className="absolute left-0 right-0 flex items-center justify-center bottom-10 lg:bottom-4"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
        >
          <LoadingPill />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessageListLoader;
