'use client';

import useMessageAPI from '@/hooks/api/useMessageAPI';
import { ChannelsEntity } from '@/hooks/entities/messages.entities';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography
} from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ChannelsPage() {
  const router = useRouter();
  const { getChannels } = useMessageAPI();
  const [channels, setChannels] = useState<ChannelsEntity[]>([]);

  const loadChannels = async () => {
    try {
      const fetchedChannels = await getChannels();
      setChannels(fetchedChannels);
    } catch (error) {
      console.error(error);
      toast.error('Oops! Something went wrong!');
    }
  };

  useEffect(() => {
    loadChannels();
  }, []); //eslint-disable-line

  return (
    <Box width="340px" borderRight="1px solid ">
      <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={1}>
        <Typography fontWeight="bold">CHANNELS</Typography>
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Box>
      <Box px={2} pb={1} display="flex" gap={1}>
        <Chip label="All" size="small" variant="outlined" />
        <Chip label="Priority" size="small" variant="outlined" />
        <Chip label="Unread" size="small" variant="outlined" />
      </Box>
      <TextField
        placeholder="Search..."
        fullWidth
        size="small"
        sx={{ px: 0, mb: 1 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }
        }}
      />
      <Divider sx={{ borderColor: 'black' }} />
      <List>
        {channels.map((channel, idx) => (
          <Fragment key={idx}>
            <ListItem
              sx={{
                transform: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: 1,
                '&hover': {
                  boxShadow: 5,
                  transform: 'scale(1.01)'
                }
              }}
              onClick={() => {
                router.push(`/v2/channels/${channel._id}`);
              }}
            >
              <ListItemAvatar>
                <Avatar src={channel.receiver.avatarURL} />
              </ListItemAvatar>
              <ListItemText
                primary={`${channel.receiver.fullName}  ${moment(channel.lastMessage?.createdAt).format('hh:mm')}`}
                secondary={channel.lastMessage?.message}
              />
            </ListItem>
            <Divider sx={{ borderColor: 'black' }} />
          </Fragment>
        ))}
      </List>
    </Box>
  );
}
