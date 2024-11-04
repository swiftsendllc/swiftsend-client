"use client";

import { ChannelsEntity } from "@/hooks/types";
import { createContext, useState } from "react";

const emptyChannel = {
  _id: "",
  users: ["", ""],
  receiver: {
    userId: "",
    fullName: "",
    avatarURL: "",
    user: { email: "" },
    username: "",
    pronouns: "",
    gender: "",
    bio: "",
    websiteURL: "",
    bannerURL: "",
    postCount: 0,
    followerCount: 0,
    followingCount: 0,
    region: "",
    following: false,
  },
  lastMessage: null,
} satisfies ChannelsEntity;

export const ChannelContext = createContext<
  [ChannelsEntity, React.Dispatch<React.SetStateAction<ChannelsEntity>>]
>([emptyChannel, () => null]);

export function ChannelContextWrapper({
  children,
  channel,
}: {
  children: React.ReactNode;
  channel: ChannelsEntity | null;
}) {
  const [channelInfo, setChannel] = useState<ChannelsEntity>(channel || emptyChannel);
  return (
    <ChannelContext.Provider value={[channelInfo, setChannel]}>
      {children}
    </ChannelContext.Provider>
  );
}
