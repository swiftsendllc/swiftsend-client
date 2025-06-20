'use client';

import MotionPresets from '@/components/MotionPresets';
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
  const [channels, setChannels] = useState<ChannelsEntity[]>([]);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const isMidScreen = useMediaQuery(theme.breakpoints.up('sm'));

  const loadChannels = async () => {
    try {
      const fetchedChannels = await getChannels();
      setChannels(fetchedChannels);
    } catch (error) {
      console.error(error);
      toast.error('Oops! Something went wrong!');
    }
  };

  useEffect(() => {
    loadChannels();
  }, []); //eslint-disable-line

  return (
    <>
      <Box width={isSmallScreen ? '100%' : '340px'} borderRight="1px solid ">
        <MotionPresets motionType="SlideTopDown">
          <ChannelHeader />
          <Divider sx={{ borderColor: 'black' }} />
          <ChannelList channels={channels} />
        </MotionPresets>
      </Box>
      {(isLargeScreen || isMidScreen) && !channelId && <NoChatSelected />}
    </>
  );
}
