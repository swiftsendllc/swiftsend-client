'use client';

import { LeftSideBar } from '@/components/LeftSideBar';
import useMessageAPI from '@/hooks/api/useMessageAPI';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import { Box } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ChannelsPage from '../components/Channels';
import { MessageAssetAndAnalyticsBar } from './components/MessageAssetAndAnalyticsBar';
import { MessageThread } from './components/MessageThread';

export default function MessagePage() {
  const { channelId } = useParams();
  const { getChannelMessages } = useMessageAPI();
  const [messages, setMessages] = useState<MessagesEntity[]>([]);

  const loadMessages = async () => {
    try {
      const fetchedMessages = await getChannelMessages(channelId as string, { offset: 0, limit: 30 });
      setMessages(fetchedMessages);
    } catch (error) {
      console.error(error);
      toast.error('Oops! Something wrong happened!');
    }
  };

  useEffect(() => {
    if (channelId) loadMessages();
  }, [channelId]); //eslint-disable-line
  return (
    <Box display="flex" height="100vh" fontFamily="Arial, sans-serif" sx={{ minWidth: 0, overflow: 'hidden' }}>
      <LeftSideBar />
      <ChannelsPage />
      <MessageThread messages={messages} />
      <MessageAssetAndAnalyticsBar />
    </Box>
  );
}
