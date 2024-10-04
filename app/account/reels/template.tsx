"use client";

import MotionPresets from "@/components/MotionPresets";

export default function PageTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionPresets motionType="SlideRightToLeft">{children}</MotionPresets>
  );
}
