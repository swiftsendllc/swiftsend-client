"use client";

import MessageInput from "@/app/channels/[channelId]/components/MessageInput";
import useMessageAPI from "@/hooks/api/useMessageAPI";
import { ChannelContext } from "@/hooks/context/channel-context";
import { useSocket } from "@/hooks/context/socket-context";
import { UserContext } from "@/hooks/context/user-context";
import { MessagesEntity } from "@/hooks/entities/messages.entities";
import { Box, Container, LinearProgress, List } from "@mui/material";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import { ChatHeaderPage } from "./components/ChatHeader";
import { MessageBubblePage } from "./components/MessageThread";

export default function MessagePage() {
  const limit = 20;
  const { socket } = useSocket();
  const { channelId } = useParams();
  const [user] = useContext(UserContext);
  const [hasMore, setHasMore] = useState(true);
  const [channel] = useContext(ChannelContext);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<MessagesEntity[]>([]);
  const { getChannelMessages, messageSeen, messageDelivered } = useMessageAPI();

  const loadChannelMessages = async (initialLoad = false) => {
    const offset = initialLoad ? 0 : messages.length;

    setLoading(true);
    try {
      const messages = await getChannelMessages(channelId as string, {
        offset,
        limit,
      });

      if (initialLoad) {
        setMessages(messages);
      } else {
        setHasMore(messages.length === limit);
        setMessages((prev) => [...prev, ...messages]);
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
    if (channelId) loadChannelMessages();
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

  const loadMoreMessages = () => {
    console.log("end_");

    if (hasMore && !loading) {
      loadChannelMessages();
    }
  };

  return (
    <>
      <Container
        maxWidth="xs"
        style={{
          padding: 0,
          marginBottom: 60,
        }}
      >
        <Box
          width="100%"
          sx={{
            position: "fixed",

            zIndex: 8,
          }}
        >
          <ChatHeaderPage channel={channel} messages={messages} />
        </Box>
        <List
          sx={{
            height: "800px",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column-reverse",
          }}
          id="scroll-id"
        >
          <InfiniteScroll
            style={{
              overflow: "hidden",
              display: "flex",
              flexDirection: "column-reverse",
            }}
            dataLength={messages.length}
            hasMore={hasMore}
            inverse={true}
            scrollThreshold={0.8}
            next={loadMoreMessages}
            loader={
              loading && (
                <LinearProgress sx={{ marginTop: 10, position: "relative" }} />
              )
            }
            initialScrollY={500}
            scrollableTarget="scroll-id"
          >
            <MessageBubblePage
              messages={messages}
              channel={channel}
              user={user}
              setMessages={setMessages}
            />
          </InfiniteScroll>
        </List>

        {messages && (
          <MessageInput
            onMessage={(msg) => {
              setMessages((prev) => [msg, ...prev]);
            }}
          />
        )}
      </Container>
    </>
  );
}
