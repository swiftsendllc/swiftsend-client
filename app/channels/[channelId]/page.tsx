'use client';

import PaymentModalWrapper from '@/components/PaymentModal';
import useMessageAPI from '@/hooks/api/useMessageAPI';
import usePaymentAPI from '@/hooks/api/usePaymentAPI';
import { useBackDrop } from '@/hooks/context/backdrop-context';
import { ChannelContext } from '@/hooks/context/channel-context';
import { UserContext } from '@/hooks/context/user-context';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ChannelsPage from '../components/Channels';
import { FetchSocketMessages } from './components/FetchSocketMessages';
import { MessageAssetAndAnalyticsBar } from './components/MessageAssetAndAnalyticsBar';
import { MessageThread } from './components/MessageThread';

export default function MessagePage() {
  const limit = 25;
  const theme = useTheme();
  const { channelId } = useParams();
  const [user] = useContext(UserContext);
  const { createPayment } = usePaymentAPI();
  const [channel] = useContext(ChannelContext);
  const { backdrop } = useBackDrop();
  const { getChannelMessages } = useMessageAPI();
  const isMobile = useMediaQuery('(max-width:740px)');
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<MessagesEntity[]>([]);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const [paymentModal, setPaymentModal] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedMessage, setSelectedMessage] = useState<MessagesEntity | null>(null);
  FetchSocketMessages({ setMessages });

  const handleLoadMessages = async (initialLoad = false) => {
    const offset = initialLoad ? 0 : messages.length;
    try {
      const fetchedMessages = await getChannelMessages(channelId as string, { offset, limit });
      if (initialLoad) setMessages(fetchedMessages);
      else {
        setHasMore(fetchedMessages.length === limit);
        setMessages((prev) => [...prev, ...fetchedMessages]);
      }
    } catch (error) {
      console.error(error);
      toast.error('Oops! Something wrong happened!');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMoreMessages = () => {
    if (hasMore && !loading) handleLoadMessages();
    console.log('end');
  };

  const handleMakePayment = async (paymentMethodId: string) => {
    if (!selectedMessage) {
      return {
        requiresAction: false,
        clientSecret: ''
      };
    }
    const paymentResponse = await createPayment(selectedMessage.senderId, 'message', {
      amount: selectedMessage.price,
      contentId: selectedMessage._id,
      payment_method: paymentMethodId,
      payment_method_types: ['card']
    });
    return {
      requiresAction: paymentResponse.requiresAction,
      clientSecret: paymentResponse.clientSecret
    };
  };

  const handleReload = async () => await new Promise(() => setTimeout(handleLoadMessages, 1000));

  const handleUpdated = (msg: MessagesEntity) => {
    setMessages((prev) =>
      prev.map((m) => {
        const updated =
          m._id === msg._id
            ? {
                ...m,
                message: msg.message,
                editedAt: msg.editedAt,
                edited: msg.edited
              }
            : m;
        return updated;
      })
    );
  };

  const handleDeleted = (msg: MessagesEntity) => {
    setMessages((prev) =>
      prev.map((m) => {
        const _deleted =
          m._id === msg._id
            ? {
                ...m,
                message: msg.message,
                deletedAt: msg.deletedAt,
                deleted: msg.deleted
              }
            : m;
        return _deleted;
      })
    );
  };

  const handleDeleteMultiple = (msgs: MessagesEntity[]) => {
    const idsToDelete = msgs.map((u) => u._id);
    setMessages((prev) =>
      prev.map((m) =>
        idsToDelete.includes(m._id)
          ? {
              ...m,
              deleted: true,
              deletedAt: new Date()
            }
          : m
      )
    );
  };

  useEffect(() => {
    if (channelId) handleLoadMessages();
  }, [channelId, setLoading, setHasMore, setMessages, limit]); //eslint-disable-line

  return (
    <Box
      display="flex"
      flexDirection={isSmallScreen ? 'column' : 'row'}
      height="100vh"
      width="100%"
      overflow="hidden"
      sx={{
        backgroundImage: `url(${channel.backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {selectedMessage && (
        <PaymentModalWrapper
          isOpen={paymentModal}
          onSuccess={handleReload}
          makePayment={handleMakePayment}
          onClose={() => setPaymentModal(false)}
          metadata={{
            userId: user.userId,
            creatorId: selectedMessage.senderId,
            contentId: selectedMessage._id
          }}
        />
      )}
      <Box
        flexShrink={0}
        flex={isMobile ? 'none' : '0 0 340px'}
        minWidth={isMobile ? '100%' : '340px'}
        display={isMobile && channelId ? 'none' : 'block'}
      >
        <ChannelsPage />
      </Box>
      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        sx={{
          height: '100%',
          overflow: 'hidden',
          zIndex: 2
        }}
      >
        <MessageThread
          backdrop={backdrop}
          loading={loading}
          hasMore={hasMore}
          messages={messages}
          setPaymentModal={setPaymentModal}
          setSelectedMessage={setSelectedMessage}
          handleLoadMore={handleLoadMoreMessages}
          onDeleteMessage={handleDeleted}
          onUpdateMessage={handleUpdated}
          onDeleteMultiple={(msgs) => handleDeleteMultiple(msgs)}
          onSend={(msg) => setMessages((prev) => [msg, ...prev])}
        />
      </Box>
      {isLargeScreen && (
        <MessageAssetAndAnalyticsBar
          onMessage={(msg) => setMessages((prev) => [msg, ...prev])}
          loading={loading}
          backdrop={backdrop}
        />
      )}
    </Box>
  );
}
