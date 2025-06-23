import { ChannelsEntity } from '@/hooks/entities/messages.entities';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

interface ChannelProps {
  channels: ChannelsEntity[];
}

export function ChannelList({ channels }: ChannelProps) {
  const router = useRouter();
  return (
    <>
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
              onClick={() => router.push(`/v2/channels/${channel._id}`)}
              secondaryAction={
                <IconButton>
                  <SettingsOutlinedIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar src={channel.receiver.avatarURL} />
              </ListItemAvatar>
              <ListItemText
                primary={`${channel.receiver.fullName}  ${moment(channel.lastMessage?.createdAt).format('hh:mm')}`}
                secondary={`${channel.lastMessage?.message.slice(0, 31)}...`}
              />
            </ListItem>
            <Divider sx={{ borderColor: 'black' }} />
          </Fragment>
        ))}
      </List>
    </>
  );
}
