import { ChannelsEntity } from '@/hooks/entities/messages.entities';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Skeleton, Stack } from '@mui/material';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useMemo, useState } from 'react';
import { ChannelListExpanded } from './ChannelListExpanded';

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
  const [expanded, setExpanded] = useState<boolean | null>(null);
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
                <Stack direction={'column'}>
                  <ListItem
                    sx={{
                      maxHeight: 72,
                      transform: 'all 0.3s ease',
                      cursor: 'pointer',
                      boxShadow: 1
                    }}
                    onClick={() => router.push(`/channels/${channel._id}`)}
                    secondaryAction={
                      <IconButton
                        onClick={(event) => {
                          event.stopPropagation();
                          setExpanded((prev) => !prev);
                        }}
                      >
                        {expanded ? <SettingsBackupRestoreIcon /> : <SettingsOutlinedIcon />}
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
                  <ChannelListExpanded expanded={expanded} />
                </Stack>
                <Divider sx={{ borderColor: 'black' }} />
              </Fragment>
            ))}
      </List>
    </>
  );
}
