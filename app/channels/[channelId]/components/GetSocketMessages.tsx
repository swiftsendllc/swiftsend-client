'use client';
import { useSocket } from '@/hooks/context/socket-context';
import {
  MessageReactionsEntity,
  MessagesEntity
} from '@/hooks/entities/messages.entities';
import { useEffect } from 'react';

export const GetSocketMessages = ({
  setMessages
}: {
  setMessages: React.Dispatch<React.SetStateAction<MessagesEntity[]>>;
}) => {
  const { socket } = useSocket();

  useEffect(() => {
    socket.on('newMessage', (newMessage: MessagesEntity) => {
      setMessages((prev) => [newMessage, ...prev]);
    });

    socket.on('replyMessage', (replyMessage: MessagesEntity) => {
      setMessages((prev) => [replyMessage, ...prev]);
    });

    socket.on(
      'messageEdited',
      (editedMessage: {
        messageId: string;
        message: string;
        editedAt: Date;
        edited: boolean;
      }) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === editedMessage.messageId
              ? {
                  ...msg,
                  message: editedMessage.message,
                  editedAt: editedMessage.editedAt,
                  edited: true
                }
              : msg
          )
        );
      }
    );

    socket.on(
      'messageDeleted',
      (message: {
        messageId: string;
        deleted: boolean;
        deletedAt: Date;
        message: string;
        imageURL: string;
      }) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === message.messageId
              ? {
                  ...msg,
                  messageId: message.messageId,
                  deletedAt: message.deletedAt,
                  deleted: true,
                  message: '',
                  imageURL: ''
                }
              : msg
          )
        );
      }
    );

    socket.on(
      'bulkDelete',
      (bulkDelete: {
        messageIds: string[];
        deletedAt: Date;
        deleted: true;
      }) => {
        setMessages((prev) =>
          prev.map((msg) =>
            bulkDelete.messageIds.includes(msg._id)
              ? {
                  ...msg,
                  messageIds: bulkDelete.messageIds,
                  deleted: true,
                  deletedAt: bulkDelete.deletedAt
                }
              : msg
          )
        );
      }
    );

    socket.on('messageReactions', (messageReaction: MessageReactionsEntity) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageReaction.messageId
            ? {
                ...msg,
                reactions: [...msg.reactions, messageReaction]
              }
            : msg
        )
      );
    });

    socket.on(
      'deletedReactions',
      (deletedReaction: { userId: string; reactionId: string }) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.reactions.map(
              (reaction) => reaction._id === deletedReaction.reactionId
            )
              ? {
                  ...msg,
                  reactions: msg.reactions.filter(
                    (reaction) => reaction._id !== deletedReaction.reactionId
                  )
                }
              : msg
          )
        );
      }
    );

    socket.on('connect_err', (error) => {
      console.error('Socket connection error:', error);
    });

    return () => {
      console.log('Socket disconnected:', socket.id);
      socket.off('newMessage');
      socket.off('messageEdited');
      socket.off('messageDeleted');
      socket.off('bulkDelete');
      socket.off('messageReactions');
      socket.off('connect_err');
    };
  }, [setMessages]); //eslint-disable-line
};
