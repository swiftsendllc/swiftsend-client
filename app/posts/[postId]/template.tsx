import BottomNav from "@/components/BottomNav";
import React from "react";

export default function PageTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <BottomNav />
    </>
  );
}
