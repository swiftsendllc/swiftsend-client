"use client";

import { MotionProps, motion } from "framer-motion";
import React from "react";

export type AnimationType =
  | "SlideLeftToRight"
  | "SlideRightToLeft"
  | "SlideBottomUp";

export const effects: Record<AnimationType, MotionProps> = {
  SlideLeftToRight: {
    initial: { x: "100vw" },
    animate: { x: 0 },
    transition: { ease: "easeIn", duration: 0.3 },
  },
  SlideRightToLeft: {
    initial: { x: "-100vw", minHeight: "100vh" },
    animate: { x: 0 },
    transition: { ease: "easeIn", duration: 0.3 },
  },
  SlideBottomUp: {
    initial: { y: "100vw", position: "fixed" },
    animate: { y: 0, position: "static" },
    transition: { ease: "easeIn", duration: 0.3 },
  },
};

export default function MotionPresets({
  children,
  motionType,
}: {
  children: React.ReactNode;
  motionType: AnimationType;
}) {
  return <motion.div {...effects[motionType]}>{children}</motion.div>;
}
