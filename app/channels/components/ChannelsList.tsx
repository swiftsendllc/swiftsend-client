import { StyledBadge } from '@/components/SearchComponents';
import { ChannelsEntity } from '@/hooks/entities/messages.entities';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, Button, Card, CardHeader } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AddToGroupModal } from './AddToGroupModal';

export function ChannelsList({ channels }: { channels: ChannelsEntity[] }) {
  const router = useRouter();
  const [addToGroupModal, setAddToGroupModal] = useState<boolean>(false);
  const [memberId, setMemberId] = useState<string>('');

  return (
    <>
      {channels.map((channel, idx) => (
        <Card
          key={idx}
          sx={{
            mb: 0.3,
            width: '100%',
            p: 0,
            transform: 'all 0.3s ease',
            cursor: 'pointer',
            boxShadow: 1,
            '&:hover': {
              boxShadow: 4,
              transform: 'scale(1.01)'
            }
          }}
          onClick={() => {
            router.push(`/channels/${channel._id}`);
          }}
        >
          <CardHeader
            avatar={
              <>
                <StyledBadge
                  isOnline={channel.receiver.isOnline}
                  overlap="circular"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  badgeContent
                  variant="dot"
                >
                  <Avatar aria-label="recipe" src={channel.receiver.avatarURL} alt={channel.receiver.fullName} />
                </StyledBadge>
              </>
            }
            action={
              <Button
                sx={{ height: 20, fontWeight: 200 }}
                aria-label="settings"
                variant="text"
                onClick={(event) => {
                  event.stopPropagation();
                  setMemberId(channel.receiver.userId);
                  setAddToGroupModal(true);
                }}
              >
                <AddIcon />
              </Button>
            }
            title={channel.receiver.fullName}
            subheader={
              channel.lastMessage?.deleted
                ? 'This message was deleted'
                : channel.lastMessage?.edited
                  ? 'This message was edited'
                  : `${channel.lastMessage?.message.slice(0, 10) || ''}... • ${moment(channel.lastMessage?.createdAt).format('hh:mm A')}`
            }
          />
        </Card>
      ))}
      <AddToGroupModal isOpen={addToGroupModal} onClose={() => setAddToGroupModal(false)} memberId={memberId} />
    </>
  );
}
