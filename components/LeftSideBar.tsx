'use client';
import { UserContext } from '@/hooks/context/user-context';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { useContext } from 'react';
import { leftSideBarOptions } from './SearchComponents';
import { useRouter } from 'next/navigation';

export function LeftSideBar() {
  const [user] = useContext(UserContext);
  const router = useRouter()

  return (
    <>
      <Box width={"240px"} display={{xs:"none", sm:"flex"}} flexDirection="column" py={3} px={2} borderRight="1px solid " minWidth={"240px"}>
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
        >
          New Post
        </Button>
      </Box>
    </>
  );
}
