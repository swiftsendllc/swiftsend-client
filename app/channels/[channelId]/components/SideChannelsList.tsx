import { StyledBadge } from '@/components/SearchComponents';
import useMessageAPI from '@/hooks/api/useMessageAPI';
import { ChannelsEntity } from '@/hooks/entities/messages.entities';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, Box, Button, Card, CardHeader, Paper, useTheme } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function SideChannelsList() {
  const [channels, setChannels] = useState<ChannelsEntity[]>([]);
  const { getChannels } = useMessageAPI();
  const theme = useTheme();
  const loadChannels = async () => {
    try {
      const channels = await getChannels();
      setChannels(channels);
    } catch (error) {
      console.error(error);
      toast.error('FAILED TO LOAD CHANNELS!');
    }
  };

  useEffect(() => {
    if (channels) loadChannels();
  }, []); //eslint-disable-line

  const router = useRouter();

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: theme.spacing(1),
          right: theme.spacing(2),
          width: 280,
          height:"100%",
          zIndex: 8,
          display: { xs: 'none', sm: '48%', md: 'block' }
        }}
      >
        <Paper>

        {channels.map((channel, idx) => (
          <Card
            key={idx}
            sx={{
              minWidth:300,
              transform: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: 1,
              '&:hover': {
                boxShadow: 4,
                transform: 'scale(1.01)'
              }
            }}
            onClick={() => {
              router.push(`/channels/${channel._id}`);
            }}
          >
            <CardHeader
              avatar={
                <>
                  <StyledBadge
                    isOnline={channel.receiver.isOnline}
                    overlap="circular"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    badgeContent
                    variant="dot"
                  >
                    <Avatar aria-label="recipe" src={channel.receiver.avatarURL} alt={channel.receiver.fullName} />
                  </StyledBadge>
                </>
              }
              action={
                <Button sx={{ height: 20, fontWeight: 200 }} aria-label="settings" variant="text">
                  <AddIcon />
                </Button>
              }
              title={channel.receiver.fullName}
              subheader={
                channel.lastMessage?.deleted
                  ? 'This message was deleted'
                  : channel.lastMessage?.edited
                    ? 'This message was edited'
                    : `${channel.lastMessage?.message.slice(0, 10) || ''}... • ${moment(channel.lastMessage?.createdAt).format('hh:mm A')}`
              }
            />
          </Card>
        ))}
        </Paper>
      </Box>
    </>
  );
}
