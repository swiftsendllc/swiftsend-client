'use client';

import { MotionProps, motion } from 'framer-motion';
import React from 'react';

export type AnimationType = 'SlideLeftToRight' | 'SlideRightToLeft' | 'SlideBottomUp' | 'SlideTopDown';

export const effects: Record<AnimationType, MotionProps> = {
  SlideRightToLeft: {
    initial: { x: '100vw' },
    animate: { x: 0 },
    exit: { x: '100vw' },
    transition: { ease: 'easeIn', duration: 0.6 }
  },
  SlideLeftToRight: {
    initial: { x: '-100vw' },
    animate: { x: 0 },
    exit: { x: '-100vw' },
    transition: { ease: 'easeIn', duration: 0.6 }
  },
  SlideBottomUp: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
    transition: { ease: 'easeInOut', duration: 0.9 }
  },
  SlideTopDown: {
    initial: { y: '-100%' },
    animate: { y: 0 },
    exit: { y: '-100%' },
    transition: { ease: 'easeInOut', duration: 0.9 }
  }
};

export default function MotionPresets({
  children,
  motionType
}: {
  children: React.ReactNode;
  motionType: AnimationType;
}) {
  return <motion.div {...effects[motionType]}>{children}</motion.div>;
}
