'use client';

import { createContext, useState } from 'react';
import { ChannelsEntity } from '../entities/messages.entities';

const emptyChannel = {
  _id: '',
  users: ['', ''],
  backgroundImage: '',
  isMuted: false,
  isPinned: false,
  receiver: {
    username: '',
    avatarURL: '',
    userId: '',
    lastSeen: '',
    fullName: '',
    region: '',
    bannerURL: '',
    createdAt: new Date()
  },
  lastMessage: {
    message: '',
    createdAt: new Date()
  }
} satisfies ChannelsEntity;

export const ChannelContext = createContext<[ChannelsEntity, React.Dispatch<React.SetStateAction<ChannelsEntity>>]>([
  emptyChannel,
  () => null
]);

export function ChannelContextWrapper({
  children,
  channel
}: {
  children: React.ReactNode;
  channel: ChannelsEntity | null;
}) {
  const [channelInfo, setChannelInfo] = useState<ChannelsEntity>(channel || emptyChannel);
  return <ChannelContext.Provider value={[channelInfo, setChannelInfo]}>{children}</ChannelContext.Provider>;
}
