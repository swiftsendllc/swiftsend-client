'use client';

import useMessageAPI from '@/hooks/api/useMessageAPI';
import { ChannelsEntity } from '@/hooks/entities/messages.entities';
import { Box, Divider, useMediaQuery } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { NoChatSelected } from '../[channelId]/components/NoChatSelected';
import { ChannelHeader } from './ChannelHeader';
import { ChannelList } from './ChannelList';
import { useBackDrop } from '@/hooks/context/backdrop-context';

export default function ChannelsPage() {
  const { channelId } = useParams();
  const { getChannels } = useMessageAPI();
  const [loading, setLoading] = useState<boolean>(true);
  const isMobile = useMediaQuery('(max-width:954px)');
  const [channels, setChannels] = useState<ChannelsEntity[]>([]);
  const { backdrop, handleBackdrop } = useBackDrop();

  const loadChannels = async () => {
    try {
      const fetchedChannels = await getChannels();
      setChannels(fetchedChannels);
    } catch (error) {
      console.error(error);
      toast.error('Oops! Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChannels();
  }, []); //eslint-disable-line

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? 'column' : 'row'}
      width="100%"
      height="100vh"
      overflow="hidden"
      borderRight={'1px solid'}
      sx={{ transition: 'backdrop-filter 0.3s ease', backdropFilter: `blur(${backdrop}px)` }}
    >
      <Box
        flexShrink={0}
        minWidth={isMobile ? '100%' : '340px'}
        maxWidth={isMobile ? '100%' : '400px'}
        width={isMobile ? '100%' : '25%'}
        borderRight={isMobile ? 'none' : '1px solid'}
        sx={{ overflowY: 'auto' }}
      >
        <ChannelHeader onBackDropChange={handleBackdrop} />
        <Divider sx={{ borderColor: 'black' }} />
        <ChannelList channels={channels} loading={loading} />
      </Box>

      {!isMobile && !channelId && (
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
          <NoChatSelected />
        </Box>
      )}
    </Box>
  );
}
