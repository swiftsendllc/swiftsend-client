import { ChannelsEntity } from '@/hooks/entities/messages.entities';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Skeleton } from '@mui/material';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useMemo } from 'react';

interface ChannelProps {
  loading: boolean;
  channels: ChannelsEntity[];
}

interface FormattedChannels extends ChannelsEntity {
  lastMessagedTime: string;
  last_message: string;
  receiver_name: string;
}

export function ChannelList({ channels, loading }: ChannelProps) {
  const router = useRouter();
  const formattedChannels = useMemo<FormattedChannels[]>(
    () =>
      channels.map((channel) => ({
        ...channel,
        lastMessagedTime: moment(channel.lastMessage?.createdAt).format('hh:mm'),
        last_message: channel.lastMessage?.message.slice(0, 30) ?? '',
        receiver_name: channel.receiver.fullName
      })),
    [channels]
  );

  return (
    <>
      <List>
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <ListItem key={idx} sx={{ minHeight: 72 }}>
                <ListItemAvatar>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Skeleton width={'50%'} height={20} />}
                  secondary={<Skeleton width={'70%'} height={16} />}
                />
              </ListItem>
            ))
          : formattedChannels.map((channel, idx) => (
              <Fragment key={idx}>
                <ListItem
                  sx={{
                    maxHeight: 72,
                    transform: 'all 0.3s ease',
                    cursor: 'pointer',
                    boxShadow: 1
                  }}
                  onClick={() => router.push(`/v2/channels/${channel._id}`)}
                  secondaryAction={
                    <IconButton>
                      <SettingsOutlinedIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Image
                      src={channel.receiver.avatarURL}
                      alt="avatar"
                      width={40}
                      height={40}
                      priority
                      style={{ borderRadius: '50%' } as React.CSSProperties}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${channel.receiver_name} • ${channel.lastMessagedTime}`}
                    secondary={`${channel.last_message}...`}
                  />
                </ListItem>
                <Divider sx={{ borderColor: 'black' }} />
              </Fragment>
            ))}
      </List>
    </>
  );
}
