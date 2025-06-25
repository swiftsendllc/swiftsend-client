'use client';

import useMessageAPI from '@/hooks/api/useMessageAPI';
import { ChannelsEntity } from '@/hooks/entities/messages.entities';
import { Box, Divider, useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { NoChatSelected } from '../[channelId]/components/NoChatSelected';
import { ChannelHeader } from './ChannelHeader';
import { ChannelList } from './ChannelList';

export default function ChannelsPage() {
  const theme = useTheme();
  const { channelId } = useParams();
  const { getChannels } = useMessageAPI();
  const [loading, setLoading] = useState<boolean>(true);
  const isMidScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const [channels, setChannels] = useState<ChannelsEntity[]>([]);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
    <>
      <Box
        borderRight="1px solid"
        maxWidth={'430px'}
        minWidth={'340px'}
        width={isMidScreen ? 'auto' : '100%'}
        sx={{ minHeight: '100vh', overflowY: 'auto' }}
      >
        <ChannelHeader />
        <Divider sx={{ borderColor: 'black' }} />
        <ChannelList channels={channels} loading={loading} />
      </Box>
      {!isSmallScreen && !channelId && <NoChatSelected />}
    </>
  );
}
