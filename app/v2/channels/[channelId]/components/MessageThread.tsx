import MotionPresets from '@/components/MotionPresets';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import { Box } from '@mui/material';
import { format } from 'date-fns';
import React, { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MessageInput } from './MessageInput';
import { MessageThreadBox } from './MessageThreadBox';
import { MessageThreadHeader } from './MessageThreadHeader';

interface MessageThreadProps {
  messages: MessagesEntity[];
  setPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSend: (msg: MessagesEntity) => unknown;
  setSelectedMessage: React.Dispatch<React.SetStateAction<MessagesEntity | null>>;
  loading: boolean;
  hasMore: boolean;
  handleLoadMore: () => unknown;
}

export function MessageThread({
  messages,
  onSend,
  setPaymentModal,
  setSelectedMessage,
  loading,
  hasMore,
  handleLoadMore
}: MessageThreadProps) {
  const groupedMessages = useMemo(() => {
    return Object.entries(
      messages.reduce<Record<string, MessagesEntity[]>>((acc, msg) => {
        const dateKey = format(msg.createdAt, 'yyyy-MM-dd');
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(msg);
        return acc;
      }, {})
    );
  }, [messages]);

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
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          overflowY: 'scroll',
          flexDirection: 'column-reverse'
        }}
        id="scroll-id"
      >
        <InfiniteScroll
          inverse={true}
          loader={loading}
          hasMore={hasMore}
          scrollThreshold={0.8}
          next={handleLoadMore}
          dataLength={messages.length}
          scrollableTarget={'scroll-id'}
        >
          <MessageThreadBox
            groupedMessages={groupedMessages}
            setPaymentModal={setPaymentModal}
            setSelectedMessage={setSelectedMessage}
          />
        </InfiniteScroll>
      </Box>
      <MotionPresets motionType="SlideBottomUp">
        <MessageInput onSend={(msg) => onSend(msg)} />
      </MotionPresets>
    </Box>
  );
}
