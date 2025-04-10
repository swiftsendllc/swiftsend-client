'use  client';

import { GroupsEntity } from '@/hooks/entities/messages.entities';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import { Avatar, Box, Card, CardHeader, Container, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import MembersDrawerPage from './MembersDrawer';

export default function Header({ group }: { group: GroupsEntity }) {
  const router = useRouter();
  const [memberDrawer, setMemberDrawer] = useState<boolean>(false);
  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: 8,
        left: 0,
        top: 0,
        right: 0,
        px: { md: 40, xs: 'none' }
      }}
    >
      <Container style={{ padding: 0 }}>
        <Card style={{ width: '100%', padding: 0 }}>
          <CardHeader
            avatar={
              <>
                <IconButton onClick={() => router.back()}>
                  <ArrowBackOutlinedIcon />
                </IconButton>

                <Avatar aria-label="recipe" src={group.groupAvatar} alt={group.groupAvatar} />
              </>
            }
            title={
              <IconButton sx={{ padding: 0 }} onClick={() => router.push(`/groups/${group._id}/info`)}>
                <Typography sx={{ p: 0, m: 0 }}>{group.groupName}</Typography>
              </IconButton>
            }
            subheader={group.description}
            action={
              <>
                <IconButton onClick={() => setMemberDrawer(true)}>
                  <GroupsIcon />
                </IconButton>
                <IconButton>
                  <VideoCameraFrontIcon />
                </IconButton>
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </>
            }
          />
        </Card>
        <MembersDrawerPage isOpen={memberDrawer} onClose={() => setMemberDrawer(false)} group={group} />
      </Container>
    </Box>
  );
}
