import { ChannelContext } from '@/hooks/context/channel-context';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Avatar, Box, Divider, IconButton, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Fragment, useContext, useState } from 'react';
import { MessageThreadHeaderMenuOptions } from './MessageThreadHeaderMenuOptions';

interface MessageThreadHeaderProps {
  loading: boolean;
}

export function MessageThreadHeader({ loading,  }: MessageThreadHeaderProps) {
  const theme = useTheme();
  const router = useRouter();
  const [channel] = useContext(ChannelContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const messageThreadOptions = [
    {
      label: 'starred',
      icon: <StarBorderIcon />
    },
    {
      label: 'starred',
      icon: <NotificationsNoneIcon />
    },
    {
      label: 'starred',
      icon: <PushPinOutlinedIcon />
    },
    {
      label: 'starred',
      icon: <PhotoLibraryOutlinedIcon />
    },
    {
      label: 'settings',
      icon: <MoreVertIcon />,
      action: handleMenuOpen
    }
  ];

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={2}
      py={1}
      sx={{ minHeight: 64 }}
      borderBottom={'1px solid'}
    >
      <Box display={'flex'} alignItems="center" gap={1}>
        {isSmallScreen && (
          <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
            <KeyboardReturnIcon />
          </IconButton>
        )}
        {loading ? (
          <>
            <Skeleton variant="circular" width={40} height={40} />
            <Box>
              <Skeleton variant="text" width={100} height={20} />
              <Skeleton variant="text" width={80} height={14} />
            </Box>
          </>
        ) : (
          <Box justifyContent={'space-between'} display={'flex'} flexDirection={'row'}>
            <Box display={'flex'} flexDirection={'row'}>
              <Avatar
                src={channel.receiver.avatarURL}
                sx={{ width: 40, height: 40 }}
                alt={channel.receiver.fullName || 'Swifter'}
              />
              <Box>
                <Typography fontWeight="bold">{channel.receiver.fullName || 'SwiftSend User'}</Typography>
                <Typography variant="caption">Available now</Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      {!loading && (
        <Box display="flex" alignItems="center" minHeight={40} ml={2}>
          {messageThreadOptions.map((option, idx) => (
            <Fragment key={idx}>
              <IconButton
                sx={{
                  width: 26,
                  height: 26,
                  p: 0,
                  mx: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={option.action}
                aria-label={option.label || `option-${idx}`}
              >
                {option.icon}
              </IconButton>
              {idx !== messageThreadOptions.length - 1 && (
                <Divider orientation="vertical" flexItem sx={{ mx: 0.5, bgcolor: 'black' }} />
              )}
            </Fragment>
          ))}
        </Box>
      )}
      <MessageThreadHeaderMenuOptions
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
    </Box>
  );
}
