"use client";

import { GetSocketMessagesForGroup } from "@/app/groups/[groupId]/components/GetSocketMessagesForGroup";
import useMessageAPI from "@/hooks/api/useMessageAPI";
import { GroupContext } from "@/hooks/context/group-context";
import { GroupMessagesEntity } from "@/hooks/entities/messages.entities";
import { Container, List } from "@mui/material";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import MessageInputPage from "./components/MessageInput";
import MessageThread from "./components/MessageThread";
import HeaderPage from "./components/Header";

export default function MessagePage() {
  const { groupId } = useParams();
  const [, setLoading] = useState(false);
  const { getGroupMessages } = useMessageAPI();
  const [group] = useContext(GroupContext);
  const [messages, setMessages] = useState<GroupMessagesEntity[]>([]);
  GetSocketMessagesForGroup({ setMessages });

  const loadGroupMessages = async () => {
    setLoading(true);
    try {
      const messages = await getGroupMessages(groupId as string);
      setMessages(messages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (groupId) loadGroupMessages();
  }, [groupId]); //eslint-disable-line
  return (
    <>
      <Container
        maxWidth="xs"
        style={{
          padding: 0,
          marginBottom: 60,
        }}
      >
        <HeaderPage group={group} />
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
          <MessageThread messages={messages} setMessages={setMessages} />
        </List>
        {messages && <MessageInputPage onSend={loadGroupMessages} />}
      </Container>
    </>
  );
}
