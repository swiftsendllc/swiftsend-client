import { ChannelContext } from '@/hooks/context/channel-context';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Avatar, Box, Button, Divider, List, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { useContext } from 'react';

export function ReceiverProfileInfo() {
  const [channel] = useContext(ChannelContext);

  const receiverInfos = [
    {
      label: 'Report',
      rightIcon: <ReportGmailerrorredIcon />
    },
    {
      label: 'Block',
      rightIcon: <RemoveCircleOutlineIcon />
    },
    {
      label: 'Flag',
      rightIcon: <FlagCircleIcon />
    },
    {
      label: 'Follow',
      rightIcon: <PersonAddAlt1Icon />
    }
  ];

  return (
    <Box sx={{ overflowY: 'auto', mb: 5 }}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Avatar sx={{ width: 40, height: 40 }} src={channel.receiver.avatarURL} />
        <Box textAlign={'center'}>
          <Typography variant="body1">New account since {moment(channel.receiver.createdAt).format("LTL")}</Typography>
          <Typography variant="body2">From {channel.receiver.region}</Typography>
          <Typography variant="body2">Member since 19 April, 2024</Typography>
        </Box>
        <List sx={{ width: '100%', mb: 2 }}>
          {receiverInfos.map((option, idx) => (
            <ListItemButton key={idx} sx={{ p: 0, borderRadius: 2 }}>
              <ListItemText disableTypography>
                <Stack direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
                  <Stack direction={'column'} alignContent={'center'} alignItems={'left'}>
                    <Typography variant="body1">{option.label}</Typography>
                  </Stack>
                  <Typography variant="button" color="text.secondary">
                    {option.rightIcon}
                  </Typography>
                </Stack>
                <Divider />
              </ListItemText>
            </ListItemButton>
          ))}
        </List>
        <Button>View profile</Button>
      </Box>
    </Box>
  );
}
