"use client"
import useMessageAPI from "@/hooks/api/useMessageAPI";
import { useSocket } from "@/hooks/context/socket-context";
import { UserContext } from "@/hooks/context/user-context";
import {
  ChannelsEntity,
  MessagesEntity,
} from "@/hooks/entities/messages.entities";
import { useContext, useEffect } from "react";

export const GetSocketMessages = ({
  channel,
  messages,
  setMessages,
}: {
  channel: ChannelsEntity;
  messages: MessagesEntity[];
  setMessages: React.Dispatch<React.SetStateAction<MessagesEntity[]>>;
}) => {
  const { socket } = useSocket();
  const { messageDelivered, messageSeen } = useMessageAPI();
  const [user] = useContext(UserContext);

  useEffect(() => {
    if (messages.length > 0 && channel.receiver.isOnline) {
      console.log("The receiver is online :", channel.receiver.isOnline);
      const unSeenMessages = messages.filter(
        (msg) => !msg.seen && msg.receiverId !== user.userId
      );
      if (unSeenMessages.length > 0) {
        unSeenMessages.forEach((msg) => {
          socket.emit("messageSeen", {
            messageId: msg._id,
            seen: true,
          });
          messageSeen(msg._id);
        });
      }
    }
  }, [user.userId]); //eslint-disable-line
  useEffect(() => {
    console.log("Socket connected:", socket.id);
    socket.on("newMessage", (newMessage: MessagesEntity) => {
      console.log("new message received", newMessage);
      setMessages((prev) => [newMessage, ...prev]);
      socket.emit("messageDelivered", {
        messageId: newMessage._id,
        receiverId: user._id,
      });
      messageDelivered(newMessage._id);
    });

    socket.on(
      "messageDelivered",
      (message: { messageId: string; delivered: boolean }) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === message.messageId ? { ...msg, delivered: true } : msg
          )
        );
      }
    );

    socket.on(
      "messageSeen",
      (message: { messageId: string; seen: boolean }) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === message.messageId ? { ...msg, seen: true } : msg
          )
        );
      }
    );

    socket.on(
      "messageEdited",
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
                  edited: true,
                }
              : msg
          )
        );
      }
    );

    socket.on(
      "messageDeleted",
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
                  message: "",
                  imageURL: "",
                }
              : msg
          )
        );
      }
    );

    socket.on(
      "bulkDelete",
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
                  deletedAt: bulkDelete.deletedAt,
                }
              : msg
          )
        );
      }
    );

    socket.on("connect_err", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      console.log("Socket disconnected:", socket.id);
      socket.off("newMessage");
      socket.off("messageEdited");
      socket.off("messageDeleted");
      socket.off("messageSeen");
      socket.off("messageDelivered");
      socket.off("bulkDelete");
      socket.off("connect_err");
    };
  }, [setMessages]); //eslint-disable-line
};
