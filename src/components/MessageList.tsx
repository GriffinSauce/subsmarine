import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { IoMdRefresh } from 'react-icons/io';
import MessageListItem from 'components/MessageListItem';
import MessageListItemSkeleton from 'components/MessageListItemSkeleton';
import Repeat from 'components/Repeat';
import useMessages from 'hooks/useMessages';

const MessageList: React.FC = () => {
  const { isIdle, isLoading, isError, data, refetch } = useMessages();

  const y = useMotionValue(0);
  const yRange = [0, 200];
  const opacityRange = [0, 1];
  const rotateRange = [0, 360];
  const refreshYRange = [-10, 10];
  const opacity = useTransform(y, yRange, opacityRange);
  const rotate = useTransform(y, yRange, rotateRange);
  const refreshY = useTransform(y, yRange, refreshYRange);

  const onDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.y > 100) refetch();
  };

  if (isError) return <div>Sorry, something went wrong.</div>;

  if (!data || isIdle || isLoading)
    return (
      <ul className="space-y-6">
        <Repeat length={12}>
          <li>
            <MessageListItemSkeleton />
          </li>
        </Repeat>
      </ul>
    );

  const { messages } = data;
  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 flex items-center justify-center">
        <motion.div
          className="w-8 h-8"
          style={{ y: refreshY, opacity, rotate }}
        >
          <IoMdRefresh className="w-8 h-8" />
        </motion.div>
      </div>
      <motion.ul
        className="space-y-6"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        style={{ y }}
        onDragEnd={onDragEnd}
      >
        {messages.map((message) => (
          <li key={message.id}>
            <MessageListItem message={message} />
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

export default MessageList;
