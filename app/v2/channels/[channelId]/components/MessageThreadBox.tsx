import { UserContext } from '@/hooks/context/user-context';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import { Box, Typography } from '@mui/material';
import moment from 'moment';
import { useContext, useRef } from 'react';
import { MessageThreadBoxFormatted } from './MessageThreadBoxFormatted';

interface MessageThreadProps {
  groupedMessages: [string, MessagesEntity[]][];
  setDeleteMessage: React.Dispatch<React.SetStateAction<MessagesEntity | null>>;
  setPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
  setReply: React.Dispatch<React.SetStateAction<MessagesEntity | null>>;
  setEditMessage: React.Dispatch<React.SetStateAction<MessagesEntity | null>>;
  setSelectedMessage: React.Dispatch<React.SetStateAction<MessagesEntity | null>>;
}

export function MessageThreadBox({
  setReply,
  setDeleteMessage,
  groupedMessages,
  setPaymentModal,
  setSelectedMessage,
  setEditMessage
}: MessageThreadProps) {
  const [user] = useContext(UserContext);
  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const formatDate = (date: Date | string) => {
    const now = moment();
    const targetDate = moment(date);
    if (targetDate.isSame(now, 'day')) return 'Today';
    else if (targetDate.isSame(now.subtract(1, 'day'), 'day')) return 'Yesterday';
    return targetDate.format('DD-MM-YYYY');
  };

  return (
    <Box flex={1} p={2} overflow="auto" display="flex" flexDirection="column-reverse" gap={2}>
      {groupedMessages.map(([date, messages]) => {
        return (
          <Box display="flex" key={date} gap={1} flexDirection="column">
            <Box
              position="relative"
              sx={{
                bgcolor: 'grey',
                borderRadius: 2,
                mx: 'auto',
                transition: 'all 0.3s ease-in-out',
                minWidth: '30%',
                '&:hover': {
                  transform: 'scale(1.05)',
                  backgroundColor: 'primary.main'
                }
              }}
            >
              <Typography textAlign="center">{formatDate(date)}</Typography>
            </Box>
            <Box display="flex" key={date} gap={1} flexDirection="column-reverse">
              {messages.map((message, idx) => {
                const isSender = message.senderId === user.userId;
                return (
                  <Box key={idx} display="flex" justifyContent={isSender ? 'flex-end' : 'flex-start'}>
                    <MessageThreadBoxFormatted
                      message={message}
                      setReply={setReply}
                      messageRefs={messageRefs}
                      setPaymentModal={setPaymentModal}
                      setSelectedMessage={setSelectedMessage}
                      setEditMessage={setEditMessage}
                      setDeleteMessage={setDeleteMessage}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
