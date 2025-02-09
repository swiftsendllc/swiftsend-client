"use client";

import useMessageAPI from "@/hooks/api/useMessageAPI";
import { GroupContext } from "@/hooks/context/group-context";
import { useSocket } from "@/hooks/context/socket-context";
import { GroupMessagesEntity } from "@/hooks/entities/messages.entities";
import { Container, List } from "@mui/material";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { GroupHeaderPage } from "./components/GroupHeader";
import GroupMessageInputPage from "./components/GroupMessageInput";
import { GroupMessageThreadPage } from "./components/GroupMessageThread";

export default function MessagePage() {
  const { channelId } = useParams();
  const [, setLoading] = useState(false);
  const { socket } = useSocket();
  const { getGroupMessages } = useMessageAPI();
  const [group] = useContext(GroupContext);
  const [messages, setMessages] = useState<GroupMessagesEntity[]>([]);
  const loadGroupMessages = async () => {
    setLoading(true);
    try {
      const messages = await getGroupMessages(channelId as string);
      setMessages(messages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    socket.on("groupMessage", (groupMessage: GroupMessagesEntity) => {
      console.log("groupMessage received:", groupMessage);
      setMessages((prev) => [...prev, groupMessage]);
    });

    return () => {
      console.log("Socket disconnected:", socket.id);
      socket.off("groupMessage");
    };
  }, [setMessages]); //eslint-disable-line

  useEffect(() => {
    if (channelId) loadGroupMessages();
  }, [channelId]); //eslint-disable-line
  return (
    <>
      <Container
        maxWidth="xs"
        style={{
          padding: 0,
          marginBottom: 60,
        }}
      >
        <GroupHeaderPage group={group} />
        <List
          sx={{
            marginTop: 10,
            height: "600px",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
            objectFit: "cover",
          }}
          id="scroll-id"
        >
          <GroupMessageThreadPage messages={messages} />
        </List>
        {messages && <GroupMessageInputPage onSend={loadGroupMessages} />}
      </Container>
    </>
  );
}
