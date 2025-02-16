'use client';

import { StyledBadge } from '@/components/SearchComponents';
import { ChannelsEntity } from '@/hooks/entities/messages.entities';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, Button, Card, CardHeader } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/navigation';

export default function ChannelsList({
  channels
}: {
  channels: ChannelsEntity[];
}) {
  const router = useRouter();
  return (
    <>
      {channels.map((channelUser, idx) => (
        <Card
          key={idx}
          sx={{ mb: 0.3, width: '100%', p: 0 }}
          onClick={() => {
            router.push(`/channels/${channelUser._id}`);
          }}
        >
          <CardHeader
            avatar={
              <>
                <StyledBadge
                  isOnline={channelUser.receiver.isOnline}
                  overlap="circular"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  badgeContent
                  variant="dot"
                >
                  <Avatar
                    aria-label="recipe"
                    src={channelUser.receiver.avatarURL}
                    alt={channelUser.receiver.fullName}
                  />
                </StyledBadge>
              </>
            }
            action={
              <Button
                sx={{ height: 20, fontWeight: 200 }}
                aria-label="settings"
                variant="text"
              >
                <AddIcon />
              </Button>
            }
            title={channelUser.receiver.fullName}
            subheader={
              channelUser.lastMessage?.imageURL
                ? 'Image'
                : channelUser.lastMessage?.deleted
                  ? 'This message was deleted'
                  : channelUser.lastMessage?.edited
                    ? `${
                        channelUser.lastMessage.message.slice(0, 10) || ''
                      }... • ${moment(channelUser.lastMessage.editedAt).format(
                        'hh:mm A'
                      )}`
                    : `${
                        channelUser.lastMessage?.message.slice(0, 10) || ''
                      }... • ${moment(
                        channelUser.lastMessage?.createdAt
                      ).format('hh:mm A')}`
            }
          />
        </Card>
      ))}
    </>
  );
}
