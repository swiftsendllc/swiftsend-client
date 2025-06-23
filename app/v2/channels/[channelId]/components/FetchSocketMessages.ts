import { useSocket } from '@/hooks/context/socket-context';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import React, { useEffect } from 'react';

interface SocketProps {
  setMessages: React.Dispatch<React.SetStateAction<MessagesEntity[]>>;
}

export const FetchSocketMessages = ({ setMessages }: SocketProps) => {
  const { socket } = useSocket();
  useEffect(() => {
    socket.on('newMessage', (msg: MessagesEntity) => {
      setMessages((prev) => [msg, ...prev]);
    });

    socket.on('hasPurchased', (message: { messageId: string; purchasedBy: string[] }) => {
      setMessages((prev) =>
        prev.map((msg) => {
          const updated =
            msg._id === message.messageId
              ? {
                  ...msg,
                  purchasedBy: [...msg.purchasedBy, ...message.purchasedBy],
                  isPurchased: true
                }
              : msg;
          return updated;
        })
      );
    });
    return () => {
      socket.off('hasPurchased');
      socket.off('newMessage');
    };
  }, [setMessages, socket]); //eslint-disable-line
};
