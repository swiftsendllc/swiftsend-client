import { useSocket } from "@/hooks/context/socket-context";
import {
  ChannelsEntity,
  MessagesEntity,
} from "@/hooks/entities/messages.entities";
import React, { useEffect } from "react";

export const GetSocketChannels = ({
  setChannels,
}: {
  setChannels: React.Dispatch<React.SetStateAction<ChannelsEntity[]>>;
}) => {
  const { socket } = useSocket();
  useEffect(() => {
    socket.on("newMessage", (message: MessagesEntity) => {
      setChannels((channels) => {
        return channels.map((channel) =>
          channel._id === message.channelId
            ? { ...channel, lastMessage: message }
            : channel
        );
      });
    });

    socket.on(
      "messageDeleted",
      (message: {
        messageId: string;
        deleted: boolean;
        deletedAt: Date;
        message: string;
      }) => {
        setChannels((channels) => {
          return channels.map((channel) =>
            channel.lastMessage?._id === message.messageId
              ? {
                  ...channel,
                  lastMessage: {
                    ...channel.lastMessage,
                    deleted: message.deleted,
                    deletedAt: message.deletedAt,
                    message: "",
                  },
                }
              : channel
          );
        });
      }
    );
    socket.on(
      "messageEdited",
      (editedMessage: {
        messageId: string;
        message: string;
        editedAt: Date;
        edited: true;
      }) => {
        setChannels((channels) => {
          return channels.map((channel) =>
            channel.lastMessage?._id === editedMessage.messageId
              ? {
                  ...channel,
                  lastMessage: {
                    ...channel.lastMessage,
                    edited: editedMessage.edited,
                    editedAt: editedMessage.editedAt,
                    message: editedMessage.message,
                  },
                }
              : channel
          );
        });
      }
    );

    return () => {
      socket.off("newMessage");
      socket.off("onlineUsers");
      socket.off("messageDeleted");
      socket.off("messageEdited");
    };
  }, [setChannels]); //eslint-disable-line
};
