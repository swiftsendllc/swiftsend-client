'use client';

import { ChannelsContext } from '@/hooks/context/channels-context';
import { UserContext } from '@/hooks/context/user-context';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Divider, Stack, Tab, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { ChannelHeader } from './ChannelHeader';
import { ChannelsList } from './ChannelsList';
import { GetSocketChannels } from './GetSocketChannels';

export default function ChannelsPage() {
  const [user] = useContext(UserContext);
  const [channels, setChannels] = useContext(ChannelsContext);
  const [value, setValue] = useState<string>('2');
  const router = useRouter();
  GetSocketChannels({ setChannels });

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Container maxWidth="xs" style={{ padding: 0 }} sx={{ mb: 5, mt: 2 }}>
        <ChannelHeader user={user} />
        <Divider sx={{ mt: 1 }} />
        <TabContext value={value}>
          <Stack direction="row" spacing={1}>
            <TabList onChange={handleTabChange}>
              <Tab label="Chats " value="2" />
              <Tab label="Groups " value="3" onClick={() => router.push('/groups')} />
            </TabList>
          </Stack>
          <TabPanel value="2" sx={{ padding: 0 }}>
            {channels.length > 0 ? (
              <ChannelsList channels={channels} />
            ) : (
              <Stack my="10" sx={{ width: '100%' }} spacing={2}>
                <Box textAlign="center">
                  <Typography variant="h4" fontWeight={500}>
                    Welcome to swiftsend!
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    It looks like you have no channels yet.
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Find a swift member and start messaging
                  </Typography>
                </Box>
              </Stack>
            )}
          </TabPanel>
        </TabContext>
      </Container>
    </>
  );
}
