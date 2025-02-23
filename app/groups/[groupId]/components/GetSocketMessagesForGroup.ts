import { useSocket } from '@/hooks/context/socket-context';
import {
  GroupMessagesEntity,
  GroupReactionsEntity
} from '@/hooks/entities/messages.entities';
import React, { useEffect } from 'react';

export const GetSocketMessagesForGroup = ({
  setMessages
}: {
  setMessages: React.Dispatch<React.SetStateAction<GroupMessagesEntity[]>>;
}) => {
  const { socket } = useSocket();
  useEffect(() => {
    socket.on('groupMessage', (groupMessage: GroupMessagesEntity) => {
      console.log('groupMessage received:', groupMessage);
      setMessages((prev) => [groupMessage, ...prev]);
    });

    socket.on('groupReplyMessage', (groupReplyMessage: GroupMessagesEntity) => {
      setMessages((prev) => [groupReplyMessage, ...prev]);
    });

    socket.on(
      'group_message_edited',
      (editedMessage: {
        message: string;
        edited: boolean;
        editedAt: Date;
        _id: string;
      }) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === editedMessage._id
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
      'group_message_deleted',
      (deletedMessage: {
        _id: string;
        message: string;
        deleted: boolean;
        deletedAt: Date;
      }) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === deletedMessage._id
              ? {
                  ...msg,
                  message: '',
                  deleted: true,
                  deletedAt: deletedMessage.deletedAt
                }
              : msg
          )
        );
      }
    );

    socket.on('group_message_reacted', (reaction: GroupReactionsEntity) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === reaction.messageId
            ? { ...msg, reactions: [...(msg.reactions || []), reaction] }
            : msg
        )
      );
    });

    socket.on(
      'group_reaction_deleted',
      (deleteGroupReaction: { userId: string; reactionId: string }) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.reactions?.map(
              (reaction) => reaction?._id === deleteGroupReaction?.reactionId
            )
              ? {
                  ...msg,
                  reactions: msg.reactions.filter(
                    (reaction) =>
                      reaction._id !== deleteGroupReaction.reactionId
                  )
                }
              : msg
          )
        );
      }
    );

    return () => {
      console.log('Socket disconnected:', socket.id);
      socket.off('groupMessage');
      socket.off('group_message_edited');
      socket.off('group_message_deleted');
      socket.off('group_message_reacted');
      socket.off('group_reaction_deleted');
    };
  }, [setMessages]); //eslint-disable-line
};
