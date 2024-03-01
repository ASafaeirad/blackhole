import type { MotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

export const Transition = (props: MotionProps) => {
  return <motion.div layout transition={{ duration: 0.1 }} {...props} />;
};
