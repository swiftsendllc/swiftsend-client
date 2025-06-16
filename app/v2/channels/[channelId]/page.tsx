'use client';

import useMessageAPI from '@/hooks/api/useMessageAPI';
import { useSocket } from '@/hooks/context/socket-context';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ChannelsPage from '../components/Channels';
import { MessageAssetAndAnalyticsBar } from './components/MessageAssetAndAnalyticsBar';
import { MessageThread } from './components/MessageThread';

export default function MessagePage() {
  const theme = useTheme();
  const { channelId } = useParams();
  const { socket } = useSocket();
  const { getChannelMessages } = useMessageAPI();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMidScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [messages, setMessages] = useState<MessagesEntity[]>([]);

  useEffect(() => {
    socket.on('newMessage', (msg: MessagesEntity) => {
      console.log(msg);
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off('newMessage');
    };
  }, [setMessages, socket]);

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
      {!isSmallScreen && <ChannelsPage />}
      <MessageThread messages={messages} />
      {!isSmallScreen && !isMidScreen && (
        <MessageAssetAndAnalyticsBar onMessage={(msg) => setMessages((prev) => [...prev, msg])} />
      )}
    </Box>
  );
}
