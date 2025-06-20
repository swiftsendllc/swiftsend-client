'use client';

import MotionPresets from '@/components/MotionPresets';
import PaymentModalWrapper from '@/components/PaymentModal';
import useMessageAPI from '@/hooks/api/useMessageAPI';
import usePaymentAPI from '@/hooks/api/usePaymentAPI';
import { useSocket } from '@/hooks/context/socket-context';
import { UserContext } from '@/hooks/context/user-context';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ChannelsPage from '../components/Channels';
import { MessageAssetAndAnalyticsBar } from './components/MessageAssetAndAnalyticsBar';
import { MessageThread } from './components/MessageThread';

export default function MessagePage() {
  const theme = useTheme();
  const { channelId } = useParams();
  const { socket } = useSocket();
  const { getChannelMessages } = useMessageAPI();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMidScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [messages, setMessages] = useState<MessagesEntity[]>([]);
  const [paymentModal, setPaymentModal] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<MessagesEntity | null>(null);
  const { createPayment } = usePaymentAPI();
  const [user] = useContext(UserContext);

  useEffect(() => {
    socket.on('newMessage', (msg: MessagesEntity) => {
      console.log(msg);
      setMessages((prev) => [msg, ...prev]);
    });
    return () => {
      socket.off('newMessage');
    };
  }, [setMessages, socket]);

  const handleLoadMessages = async () => {
    try {
      const fetchedMessages = await getChannelMessages(channelId as string, { offset: 0, limit: 30 });
      setMessages(fetchedMessages);
    } catch (error) {
      console.error(error);
      toast.error('Oops! Something wrong happened!');
    }
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

  useEffect(() => {
    if (channelId) handleLoadMessages();
  }, [channelId]); //eslint-disable-line

  return (
    <>
      {selectedMessage && (
        <PaymentModalWrapper
          isOpen={paymentModal}
          onClose={() => setPaymentModal(false)}
          onSuccess={handleLoadMessages}
          metadata={{
            userId: user.userId,
            creatorId: selectedMessage.senderId,
            contentId: selectedMessage._id
          }}
          makePayment={handleMakePayment}
        />
      )}
      <Box display="flex" height="100vh" fontFamily="Arial, sans-serif" sx={{ minWidth: 0, overflow: 'hidden' }}>
        {!isSmallScreen && <ChannelsPage />}
        <MessageThread
          messages={messages}
          onSend={(msg) => setMessages((prev) => [msg, ...prev])}
          setPaymentModal={setPaymentModal}
          setSelectedMessage={setSelectedMessage}
        />
        {!isSmallScreen && !isMidScreen && (
          <MotionPresets motionType="SlideTopDown">
            <MessageAssetAndAnalyticsBar onMessage={(msg) => setMessages((prev) => [msg, ...prev])} />
          </MotionPresets>
        )}
      </Box>
    </>
  );
}
