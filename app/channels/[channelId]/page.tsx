"use client";

import MessageInput from "@/app/channels/[channelId]/components/MessageInput";
import useMessageAPI from "@/hooks/api/useMessageAPI";
import { ChannelContext } from "@/hooks/context/channel-context";
import { useSocket } from "@/hooks/context/socket-context";
import { UserContext } from "@/hooks/context/user-context";
import { MessagesEntity } from "@/hooks/entities/messages.entities";
import {
  Avatar,
  CircularProgress,
  Container,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { ChatHeaderPage } from "./components/ChatHeader";
import { MessageBubblePage } from "./components/MessageBubble";

export default function MessagePage() {
  const limit = 20;
  const { socket } = useSocket();
  const { channelId } = useParams();
  const [user] = useContext(UserContext);
  const [hasMore, setHasMore] = useState(true);
  const [channel] = useContext(ChannelContext);
  const [loading, setLoading] = useState(false);
  const [offset, setOffSet] = useState<number>(0);
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [messages, setMessages] = useState<MessagesEntity[]>([]);
  const { getChannelMessages, messageSeen, messageDelivered } = useMessageAPI();

  const loadChannelMessages = async (InitialLoad: boolean=false) => {
    setLoading(true);
    try {
      const messages = await getChannelMessages(channelId as string, {
        offset: InitialLoad ? 0 : offset,
        limit,
      });
      if(InitialLoad) {
      setMessages(messages);
      } else {
        setMessages((prev) => [...messages, ...prev])
      }
      setHasMore(messages.length === limit);
      if (!InitialLoad) {
        setOffSet((prevOffset) => prevOffset + limit);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load messages!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Socket connected:", socket.id);
    socket.on("newMessage", (newMessage: MessagesEntity) => {
      setMessages((prev) => [...prev, newMessage]);
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
      socket.off("connect_err");
    };
  }, [setMessages]); //eslint-disable-line

  useEffect(() => {
    if (channelId) loadChannelMessages(true);
  }, [channelId]); // eslint-disable-line

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
  const paginationLoadMessages = () => {
    if(hasMore && !loading) {
      loadChannelMessages()
    }
  }

  useEffect(() => {
    if (virtuosoRef.current) {
      virtuosoRef.current?.scrollToIndex({
        index: messages.length - 1,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <>
      <Container
        maxWidth="xs"
        style={{ padding: 0, marginBottom: 60, position: "relative" }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignContent="center"
          alignItems="center"
          sx={{ position: "fixed", zIndex: 4, left: 0, right: 0 }}
        >
          <ChatHeaderPage channel={channel} messages={messages} />
        </Stack>
        <Divider />
        {/* <EncryptionNoticePage /> */}
        <Virtuoso
          ref={virtuosoRef}
          style={{ height: "100vh" }}
          totalCount={messages.length}
          startReached={paginationLoadMessages}
          initialTopMostItemIndex={messages.length - 1}
          itemContent={(index: number) => {
            const message = messages[index];
            return (
              <MessageBubblePage
                message={message}
                channel={channel}
                user={user}
                setMessages={setMessages}
              />
            );
          }}
        />
        {messages.length === 0 && (
          <Stack
            my="10"
            alignContent="center"
            alignItems="center"
            justifyContent="center"
          >
            <Stack direction="row" spacing={2} my={2}>
              <Avatar src={user.avatarURL} />
              <Avatar src={channel.receiver.avatarURL} />
            </Stack>
            <CircularProgress />

            <Typography variant="h6" fontWeight="50" my={3} color="primary">
              You are connecting with {channel.receiver.fullName}
            </Typography>
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              <LinearProgress color="success" />
            </Stack>
            <Typography variant="h6" fontWeight="50" my={3} color="primary">
              hello 👋
            </Typography>
          </Stack>
        )}

        {messages && <MessageInput onMessage={() => loadChannelMessages(true)} />}
      </Container>
    </>
  );
}
