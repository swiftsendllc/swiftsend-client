'use client';

import { motion } from 'framer-motion';

export const animationType = {
  className: 'box',
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 }
};

export default function Animation({ children }: { children: React.ReactNode }) {
  return <motion.div {...animationType}>{children}</motion.div>;
}
