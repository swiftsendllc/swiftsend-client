'use client';

import MotionPresets from '@/components/MotionPresets';
import PaymentModalWrapper from '@/components/PaymentModal';
import useMessageAPI from '@/hooks/api/useMessageAPI';
import usePaymentAPI from '@/hooks/api/usePaymentAPI';
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
  const { getChannelMessages } = useMessageAPI();
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessagesEntity[]>([]);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const [paymentModal, setPaymentModal] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedMessage, setSelectedMessage] = useState<MessagesEntity | null>(null);
  FetchSocketMessages({ setMessages });

  const handleLoadMessages = async (initialLoad = false) => {
    const offset = initialLoad ? 0 : messages.length;
    setLoading(true);

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

  const handleReload = async () => {
    await new Promise(() => setTimeout(handleLoadMessages, 1000));
  };

  useEffect(() => {
    if (channelId) handleLoadMessages();
  }, [channelId]); //eslint-disable-line

  return (
    <>
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
      <Box display="flex" height="100vh" fontFamily="Arial, sans-serif" sx={{ minWidth: 0, overflow: 'hidden' }}>
        {!isSmallScreen && <ChannelsPage />}
        <MessageThread
          loading={loading}
          hasMore={hasMore}
          messages={messages}
          setPaymentModal={setPaymentModal}
          setSelectedMessage={setSelectedMessage}
          handleLoadMore={handleLoadMoreMessages}
          onSend={(msg) => setMessages((prev) => [msg, ...prev])}
        />
        {isLargeScreen && (
          <MotionPresets motionType="SlideTopDown">
            <MessageAssetAndAnalyticsBar onMessage={(msg) => setMessages((prev) => [msg, ...prev])} />
          </MotionPresets>
        )}
      </Box>
    </>
  );
}
