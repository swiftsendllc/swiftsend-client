import MotionPresets from '@/components/MotionPresets';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import { Box } from '@mui/material';
import { format } from 'date-fns';
import React, { useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DeleteMessageModal } from './DeleteMessageModal';
import { EditMessageModal } from './EditMessageModal';
import { MessageInput } from './MessageInput';
import MessageSkeletonLoader from './MessageSkeletonLoader';
import { MessageThreadBox } from './MessageThreadBox';
import { MessageThreadHeader } from './MessageThreadHeader';

interface MessageThreadProps {
  messages: MessagesEntity[];
  setPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSend: (msg: MessagesEntity) => unknown;
  setSelectedMessage: React.Dispatch<React.SetStateAction<MessagesEntity | null>>;
  loading: boolean;
  hasMore: boolean;
  backdrop: number;
  onUpdateMessage: (msg: MessagesEntity) => unknown;
  onDeleteMessage: (msg: MessagesEntity) => unknown;
  handleLoadMore: () => unknown;
}

export function MessageThread({
  messages,
  onSend,
  loading,
  hasMore,
  backdrop,
  setPaymentModal,
  onUpdateMessage,
  handleLoadMore,
  onDeleteMessage,
  setSelectedMessage
}: MessageThreadProps) {
  const [reply, setReply] = useState<MessagesEntity | null>(null);
  const [editMessage, setEditMessage] = useState<MessagesEntity | null>(null);
  const [deleteMessage, setDeleteMessage] = useState<MessagesEntity | null>(null);

  const groupedMessages = useMemo(() => {
    return Object.entries(
      messages.reduce<Record<string, MessagesEntity[]>>((acc, msg) => {
        const dateKey = format(msg.createdAt, 'yyyy-MM-dd');
        acc[dateKey] ??= [];
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
      maxWidth="746px"
      width="auto"
      borderRight="1px solid "
      height="100vh"
      sx={{ backdropFilter: `blur(${backdrop}px)` }}
    >
      <MessageThreadHeader loading={loading} />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          overflowY: 'scroll',
          flexDirection: 'column-reverse'
        }}
        id="scroll-id"
      >
        {loading ? (
          <MessageSkeletonLoader />
        ) : (
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
              setReply={setReply}
              setDeleteMessage={setDeleteMessage}
              setEditMessage={setEditMessage}
              groupedMessages={groupedMessages}
              setPaymentModal={setPaymentModal}
              setSelectedMessage={setSelectedMessage}
            />
          </InfiniteScroll>
        )}
      </Box>
      <MotionPresets motionType="SlideBottomUp">
        <MessageInput onSend={(msg) => onSend(msg)} reply={reply} setReply={setReply} loading={loading} />
      </MotionPresets>
      {editMessage && (
        <EditMessageModal
          isOpen={!!editMessage}
          message={editMessage}
          onClose={() => setEditMessage(null)}
          onUpdateMessage={onUpdateMessage}
        />
      )}
      {deleteMessage && (
        <DeleteMessageModal
          isOpen={!!deleteMessage}
          onClose={() => setDeleteMessage(null)}
          message={deleteMessage}
          onDeleteMessage={onDeleteMessage}
        />
      )}
    </Box>
  );
}
