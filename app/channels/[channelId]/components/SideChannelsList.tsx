import useMessageAPI from '@/hooks/api/useMessageAPI';
import { ChannelsEntity } from '@/hooks/entities/messages.entities';
import Groups3Icon from '@mui/icons-material/Groups3';
import { Avatar, Box, Button, Card, CardHeader, Stack, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function SideChannelsList() {
  const [channels, setChannels] = useState<ChannelsEntity[]>([]);
  const { getChannels } = useMessageAPI();
  const theme = useTheme();
  const router = useRouter();
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
    loadChannels();
  }, []); //eslint-disable-line

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: theme.spacing(1),
          right: theme.spacing(2),
          width: 280,
          zIndex: 8,
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Box
          sx={{
            pb: 2,
            borderBottom: '1px solid #ddd',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            ml: 2
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            🆂🆆🅸🅵🆃🅴🆁🆂
          </Typography>
          <Stack direction="column-reverse">
            <Typography variant="body2" fontWeight="bold" display="flex">
              {channels.length}
            </Typography>
            <Groups3Icon />
          </Stack>
        </Box>
        <Box sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 60px)', mt: 2 }}>
          {channels.map((member, idx) => (
            <Card
              key={idx}
              sx={{
                mb: 1,
                p: 1,
                boxShadow: 2,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <CardHeader
                onClick={() => router.push(`/channels/${member._id}`)}
                avatar={<Avatar src={member.receiver.avatarURL} alt={member.receiver.fullName} />}
                title={member.receiver.fullName}
                subheader={member.receiver.username}
                action={
                  <Button variant="contained" size="small">
                    A
                  </Button>
                }
                sx={{ flex: 1 }}
              />
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}
