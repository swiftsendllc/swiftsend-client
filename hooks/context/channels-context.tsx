"use client";

import React, { createContext, useState } from "react";
import { ChannelsEntity } from "../entities/messages.entities";

export const ChannelsContext = createContext<
  [ChannelsEntity[], React.Dispatch<React.SetStateAction<ChannelsEntity[]>>]
>([[], () => null]);

export function ChannelsContextWrapper({
  children,
  channels,
}: {
  children: React.ReactNode;
  channels: ChannelsEntity[];
}) {
  const [channelsInfo, setChannelsInfo] = useState<ChannelsEntity[]>(channels || [])
  return (
    <ChannelsContext.Provider value={[channelsInfo, setChannelsInfo]}>
      {children}
    </ChannelsContext.Provider>
  )
}
