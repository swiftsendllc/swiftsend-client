"use client";

import MotionPresets from "@/components/MotionPresets";

export default function PageTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;

  // return (
  //   <MotionPresets motionType="SlideLeftToRight">{children}</MotionPresets>
  // );
}
