"use client";

import MessageInput from "@/app/channels/[channelId]/components/MessageInput";
import useMessageAPI from "@/hooks/api/useMessageAPI";
import { ChannelContext } from "@/hooks/context/channel-context";
import { UserContext } from "@/hooks/context/user-context";
import { MessagesEntity } from "@/hooks/entities/messages.entities";
import { Container, List } from "@mui/material";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import { ChatHeaderPage } from "./components/ChatHeader";
import { GetSocketMessages } from "./components/GetSocketMessages";
import { MessageThreadPage } from "./components/MessageThread";

export default function MessagePage() {
  const limit = 20;
  const { channelId } = useParams();
  const [user] = useContext(UserContext);
  const [hasMore, setHasMore] = useState(true);
  const [channel] = useContext(ChannelContext);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<MessagesEntity[]>([]);
  const { getChannelMessages } = useMessageAPI();
  const [checkBox, setCheckBox] = useState(false);
  const [background, setBackground] = useState(false)
  const [selectedMessageIds, setSelectedMessageIds] = useState<string[]>([]);
  GetSocketMessages({ setMessages, channel, messages });

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

  const loadMoreMessages = () => {
    console.log("end_");

    if (hasMore && !loading) {
      loadChannelMessages();
    }
  };

  useEffect(() => {
    if (channelId) loadChannelMessages();
  }, [channelId]); // eslint-disable-line


  return (
    <>
      <Container
        maxWidth="xs"
        style={{
          padding: 0,
          marginBottom: 60,
        }}
      >
        <ChatHeaderPage
          channel={channel}
          messages={messages}
          checkBox={checkBox}
          setCheckBox={setCheckBox}
          selectedMessageIds={selectedMessageIds}
          setSelectedMessageIds={setSelectedMessageIds}
          loading={loading}
          background={background}
          setBackground={setBackground}
        />
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
            loader={loading}
            initialScrollY={500}
            scrollableTarget="scroll-id"
          >
            <MessageThreadPage
              user={user}
              channel={channel}
              messages={messages}
              checkBox={checkBox}
              setMessages={setMessages}
              selectedMessageIds={selectedMessageIds}
              setSelectedMessageIds={setSelectedMessageIds}
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
