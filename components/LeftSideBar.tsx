'use client';
import { UserContext } from '@/hooks/context/user-context';
import AddIcon from '@mui/icons-material/Add';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CollectionsIcon from '@mui/icons-material/Collections';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HomeIcon from '@mui/icons-material/Home';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { ScrapeDialog } from './ScrapeModal';

export function LeftSideBar() {
  const [user] = useContext(UserContext);
  const router = useRouter();
  const [scrapeModal, setScrapeModal] = useState<boolean>(false);

  const leftSideBarOptions = [
    { icon: <HomeIcon />, label: 'Home', path: '/home' },
    { icon: <NotificationsIcon />, label: 'Notifications', path: '/notifications' },
    { icon: <ChatBubbleOutlineIcon />, label: 'Channels', path: '/channels' },
    { icon: <CollectionsIcon />, label: 'Assets', path: '/assets' },
    { icon: <PersonIcon />, label: 'Subscriptions', path: '/subscriptions' },
    { icon: <CreditCardIcon />, label: ' Add card', path: '/billing' },
    { icon: <PersonIcon />, label: 'My profile', path: `/${user.username}` },
    { icon: <MoreHorizIcon />, label: 'More', path: '/more' }
  ];
  return (
    <>
      <Box
        width={'240px'}
        display={{ xs: 'none', sm: 'flex' }}
        flexDirection="column"
        py={3}
        px={2}
        borderRight="1px solid "
        minWidth={'240px'}
      >
        <Box display="flex" alignItems="center" mb={4}>
          <Avatar src={user.avatarURL} sx={{ mr: 1 }} />
          <Typography fontWeight="bold">{user.fullName}</Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={2}>
          {leftSideBarOptions.map((option, idx) => (
            <Button
              key={idx}
              startIcon={option.icon}
              sx={{
                justifyContent: 'flex-start',
                transform: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: 1,
                '&hover': {
                  boxShadow: 4,
                  transform: 'scale(1.01)'
                }
              }}
              onClick={() => router.push(option.path)}
            >
              {option.label}
            </Button>
          ))}
        </Box>
        <Button
          variant="contained"
          sx={{ mt: 'auto', borderRadius: 999, px: 2, textTransform: 'none' }}
          startIcon={<AddIcon />}
          onClick={() => setScrapeModal(true)}
        >
          New Post
        </Button>
        <ScrapeDialog isOpen={scrapeModal} onClose={() => setScrapeModal(false)} />
      </Box>
    </>
  );
}
