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

    socket.on('replyMessage', (msg: MessagesEntity) => {
      setMessages((prev) => [msg, ...prev]);
    });

    socket.on('messageEdited', (_edited: { messageId: string; message: string; editedAt: Date; edited: boolean }) => {
      setMessages((prev) =>
        prev.map((msg) => {
          const editedMessage =
            msg._id === _edited.messageId
              ? {
                  ...msg,
                  message: _edited.message,
                  editedAt: _edited.editedAt,
                  edited: _edited.edited
                }
              : msg;
          return editedMessage;
        })
      );
    });

    socket.on('messageDeleted', (_deleted: { deleted: true; deletedAt: Date; messageId: string; message: string }) => {
      setMessages((prev) =>
        prev.map((msg) => {
          const deletedMessage =
            msg._id === _deleted.messageId
              ? {
                  ...msg,
                  message: _deleted.message,
                  deleted: _deleted.deleted,
                  deletedAt: _deleted.deletedAt
                }
              : msg;
          return deletedMessage;
        })
      );
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
      socket.off('replyMessage');
      socket.off('messageEdited');
      socket.off('messageDeleted');
    };
  }, [setMessages, socket]); //eslint-disable-line
};
