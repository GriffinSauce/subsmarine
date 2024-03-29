import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { MutableRefObject, useEffect, useRef } from 'react';
import { IoMdRefresh } from 'react-icons/io';

interface Props {
  onPull: () => void;
}

// How far the content needs to be moved before we call onPull
const THRESHOLD = 60;

/**
 * Returns a ref
 */
const useMotionValueThreshold = (
  motionValue: MotionValue<number>,
  threshold: number,
): MutableRefObject<boolean> => {
  const hitThresholdRef = useRef<boolean>(false);
  useEffect(
    () =>
      motionValue.onChange((latest) => {
        hitThresholdRef.current = latest > threshold;
      }),
    [motionValue, threshold],
  );
  return hitThresholdRef;
};

const PullToRefresh: React.FC<Props> = ({ children, onPull }) => {
  const dragY = useMotionValue(0);

  // Respond to drag movement
  const opacity = useTransform(dragY, [0, THRESHOLD], [0, 1]);
  const rotate = useTransform(dragY, [0, 200], [0, 360]);
  const y = useTransform(dragY, [0, 200], [-10, 50]);

  // Respond to hitting the threshold
  const colorYRange = [0, THRESHOLD, THRESHOLD + 5];
  const bgColorRange = [
    'rgba(255,255,255,0)',
    'rgba(255,255,255,0)',
    'rgb(59 130 246)', // blue-500
  ];
  const backgroundColor = useTransform(dragY, colorYRange, bgColorRange);

  const hitThresholdRef = useMotionValueThreshold(dragY, THRESHOLD);

  const onDragEnd = () => {
    if (hitThresholdRef.current) onPull();
  };

  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 flex items-center justify-center">
        <motion.div
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={{ y, opacity, rotate, backgroundColor }}
        >
          <IoMdRefresh className="h-8 w-8" />
        </motion.div>
      </div>
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.2 }}
        style={{ y: dragY }}
        onDragEnd={onDragEnd}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PullToRefresh;
