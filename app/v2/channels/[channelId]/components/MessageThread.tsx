import MotionPresets from '@/components/MotionPresets';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import { Box } from '@mui/material';
import { format } from 'date-fns';
import React, { useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DeleteMessageModal } from './DeleteMessageModal';
import { DeleteMultipleMessageDialog } from './DeleteMultipleMessageDialog';
import { EditMessageModal } from './EditMessageModal';
import { MessageInput } from './MessageInput';
import MessageSkeletonLoader from './MessageSkeletonLoader';
import { MessageThreadBox } from './MessageThreadBox';
import { MessageThreadHeader } from './MessageThreadHeader';

interface MessageThreadProps {
  setSelectedMessage: React.Dispatch<React.SetStateAction<MessagesEntity | null>>;
  setPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteMultiple: (msgs: MessagesEntity[]) => unknown;
  onUpdateMessage: (msg: MessagesEntity) => unknown;
  onDeleteMessage: (msg: MessagesEntity) => unknown;
  onSend: (msg: MessagesEntity) => unknown;
  handleLoadMore: () => unknown;
  messages: MessagesEntity[];
  loading: boolean;
  hasMore: boolean;
  backdrop: number;
}

export function MessageThread({
  messages,
  onSend,
  loading,
  hasMore,
  backdrop,
  onDeleteMultiple,
  setPaymentModal,
  onUpdateMessage,
  handleLoadMore,
  onDeleteMessage,
  setSelectedMessage
}: MessageThreadProps) {
  const [reply, setReply] = useState<MessagesEntity | null>(null);
  const [editMessage, setEditMessage] = useState<MessagesEntity | null>(null);
  const [deleteMessage, setDeleteMessage] = useState<MessagesEntity | null>(null);
  const [multipleSelectCheckBox, setMultipleSelectCheckBox] = useState<boolean>(false);
  const [deleteMultipleOpen, setDeleteMultipleOpen] = useState<boolean>(false);
  const [selectedMultiple, setSelectedMultiple] = useState<MessagesEntity[]>([]);

  const handleToggleSelect = (message: MessagesEntity) => {
    setSelectedMultiple((prev) => {
      const newSelectedMessages = prev.includes(message) ? prev.filter((m) => m !== message) : [...prev, message];
      return newSelectedMessages;
    });
  };

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
      <MessageThreadHeader
        loading={loading}
        selectedMultiple={selectedMultiple}
        setSelectedMultiple={setSelectedMultiple}
        multipleSelectCheckBox={multipleSelectCheckBox}
        onDeleteMultiple={() => setDeleteMultipleOpen(true)}
        setMultipleSelectCheckBox={setMultipleSelectCheckBox}
      />
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
              setEditMessage={setEditMessage}
              groupedMessages={groupedMessages}
              setPaymentModal={setPaymentModal}
              selectedMultiple={selectedMultiple}
              setDeleteMessage={setDeleteMessage}
              setSelectedMessage={setSelectedMessage}
              multipleSelectCheckBox={multipleSelectCheckBox}
              onToggleSelect={(msg) => handleToggleSelect(msg)}
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
          onUpdateMessage={onUpdateMessage}
          onClose={() => setEditMessage(null)}
        />
      )}
      {deleteMessage && (
        <DeleteMessageModal
          message={deleteMessage}
          isOpen={!!deleteMessage}
          onDeleteMessage={onDeleteMessage}
          onClose={() => setDeleteMessage(null)}
        />
      )}
      <DeleteMultipleMessageDialog
        isOpen={deleteMultipleOpen}
        selectedMultiple={selectedMultiple}
        setSelectedMultiple={setSelectedMultiple}
        onClose={() => setDeleteMultipleOpen(false)}
        onToggleSelect={(msg) => handleToggleSelect(msg)}
        onDeleteMultiple={(msgs) => onDeleteMultiple(msgs)}
        setMultipleSelectCheckBox={setMultipleSelectCheckBox}
      />
    </Box>
  );
}
