import type { MotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

export const Transition = (props: MotionProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      {...props}
    />
  );
};
