import { ReturnToPreviousPage } from '@/components/ReturnToPrevious';
import { ChannelContext } from '@/hooks/context/channel-context';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Avatar, Box, Divider, IconButton, Skeleton, Typography, useMediaQuery } from '@mui/material';
import { Fragment, useContext, useState } from 'react';
import { MessageThreadHeaderMenuOptions } from './MessageThreadHeaderMenuOptions';

interface MessageThreadHeaderProps {
  loading: boolean;
}

export function MessageThreadHeader({ loading }: MessageThreadHeaderProps) {
  const [channel] = useContext(ChannelContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isMobile = useMediaQuery('(max-width:740px)');

  const handleClose = () => setAnchorEl(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

  const messageThreadOptions = [
    {
      label: 'starred',
      icon: <StarBorderIcon />
    },
    {
      label: 'Blur',
      icon: <FilterListIcon />
    },
    {
      label: 'Pin message',
      icon: <PushPinOutlinedIcon />
    },
    {
      label: 'Gallery',
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
      <Box display={'flex'} alignItems="center" gap={2}>
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
            {isMobile && <ReturnToPreviousPage px={0} />}
            <Box display={'flex'} flexDirection={'row'} ml={6}>
              <Avatar
                src={channel.receiver.avatarURL}
                sx={{ width: 40, height: 40 }}
                alt={channel.receiver.fullName || 'Swifter'}
              />
              <Box ml={2}>
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
      <MessageThreadHeaderMenuOptions anchorEl={anchorEl} handleClose={handleClose} />
    </Box>
  );
}
