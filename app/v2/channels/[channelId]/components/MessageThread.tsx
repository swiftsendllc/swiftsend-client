import MotionPresets from '@/components/MotionPresets';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import { Box } from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import { MessageInput } from './MessageInput';
import { MessageThreadBox } from './MessageThreadBox';
import { MessageThreadHeader } from './MessageThreadHeader';

interface MessageThreadProps {
  messages: MessagesEntity[];
  setPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSend: (msg: MessagesEntity) => unknown;
  setSelectedMessage:React.Dispatch<React.SetStateAction<MessagesEntity | null>>
}

export function MessageThread({ messages, onSend, setPaymentModal, setSelectedMessage }: MessageThreadProps) {
  const groupedMessages = Object.entries(
    messages.reduce(
      (acc, msg) => {
        const dateKey = format(msg.createdAt, 'yyyy-MM-dd');
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(msg);
        return acc;
      },
      {} as Record<string, MessagesEntity[]>
    )
  );

  return (
    <Box
      flex={1}
      display="flex"
      flexDirection="column"
      minWidth="340px"
      width="auto"
      borderRight="1px solid "
      height="100vh"
    >
      <MotionPresets motionType="SlideTopDown">
        <MessageThreadHeader />
      </MotionPresets>
      <MessageThreadBox groupedMessages={groupedMessages} setPaymentModal={setPaymentModal} setSelectedMessage={setSelectedMessage}/>
      <MotionPresets motionType="SlideBottomUp">
        <MessageInput onSend={(msg) => onSend(msg)} />
      </MotionPresets>
    </Box>
  );
}
