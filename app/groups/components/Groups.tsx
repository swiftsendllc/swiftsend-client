'use client';

import { GroupsContext } from '@/hooks/context/groups-context';
import { UserContext } from '@/hooks/context/user-context';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Container, Divider, Stack, Tab, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import GroupHeader from './GroupHeader';
import GroupsList from './GroupsList';

export default function GroupsPage() {
  const [user] = useContext(UserContext);
  const [groups, setGroups] = useContext(GroupsContext);
  const [value, setValue] = useState<string>('3');
  const router = useRouter();

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Container sx={{ mb: 5, mt: 2, pl:{md:26, xs:"none"} }}>
        <GroupHeader user={user} setGroups={setGroups} />
        <Divider sx={{ mt: 1 }} />
        <TabContext value={value}>
          <Stack direction="row" spacing={1}>
            <TabList onChange={handleTabChange}>
              <Tab
                label="Chats "
                value="2"
                onClick={() => router.push('/channels')}
              />
              <Tab label="Groups " value="3" />
            </TabList>
          </Stack>
          <TabPanel value="3" sx={{ padding: 0 }}>
            {groups.length === 0 ? (
              <Stack
                alignContent="center"
                alignItems="center"
                justifyContent="center"
                sx={{ height: '100vh' }}
                overflow="hidden"
              >
                <Typography>YOUR GROUPS WILL APPEAR HERE!</Typography>
              </Stack>
            ) : (
              <GroupsList groups={groups} />
            )}
          </TabPanel>
        </TabContext>
      </Container>
    </>
  );
}
