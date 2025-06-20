import { ChannelContext } from '@/hooks/context/channel-context';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Avatar, Box, Divider, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Fragment, useContext } from 'react';

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
    label: 'starred',
    icon: <MoreVertIcon />
  }
];

export function MessageThreadHeader() {
  const theme = useTheme();
  const router = useRouter();
  const [channel] = useContext(ChannelContext);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box px={2} py={1} borderBottom="1px solid " display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center" gap={1}>
        {isSmallScreen && (
          <IconButton sx={{ p: 0, m: 0 }} onClick={() => router.back()}>
            <KeyboardReturnIcon />
          </IconButton>
        )}
        <Avatar src={channel.receiver.avatarURL} />
        <Box>
          <Typography fontWeight="bold">{channel.receiver.fullName}</Typography>
          <Typography variant="caption">Available now</Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" flexDirection={'row'}>
        {messageThreadOptions.map((option, idx) => (
          <Fragment key={idx}>
            <IconButton sx={{ p: 0, m: 0.5 }}>{option.icon}</IconButton>
            <Divider orientation="vertical" sx={{ bgcolor: 'black' }} />
          </Fragment>
        ))}
      </Box>
    </Box>
  );
}
