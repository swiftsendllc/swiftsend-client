"use client";

import useMessageAPI from "@/hooks/api/useMessageAPI";
import { UserContext } from "@/hooks/context/user-context";
import { GroupMessagesEntity } from "@/hooks/entities/messages.entities";
import {
  Avatar,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { GroupHeaderPage } from "./components/GroupHeader";
import MessageInput from "./components/MessageInput";
import { GroupContext } from "@/hooks/context/group-context";

export default function MessagePage() {
  const { channelId } = useParams();
  const [, setLoading] = useState(false);
  const { getGroupMessages } = useMessageAPI();
  const [group] = useContext(GroupContext)
  const [messages, setMessages] = useState<GroupMessagesEntity[]>([]);
  const [user] = useContext(UserContext);
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
        <GroupHeaderPage group={group}/>
        <List
          sx={{
            height: "600px",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column-reverse",
            objectFit: "cover",
          }}
          id="scroll-id"
        >
          {messages.map((message) => {
            const isUser = user.userId === message.senderId;
            const sender = message.sender;
            return (
              <ListItem
                key={message._id}
                sx={{
                  display: "flex",
                  justifyContent: isUser ? "flex-end" : "flex-start",
                  textAlign: isUser ? "right" : "left",
                  py: 1,
                }}
                disablePadding
              >
                {!isUser && (
                  <ListItemAvatar>
                    <Avatar alt={sender.avatarURL} src={sender.avatarURL} />
                  </ListItemAvatar>
                )}
                <ListItemButton
                  sx={{
                    backgroundColor: isUser ? "#4dabf5" : "#4caf50",
                    borderColor: isUser ? "#4dabf5" : "#4caf50",
                    borderRadius: "10px",
                    maxWidth: "60%",
                    padding: "8px",
                  }}
                >
                  <Stack
                    key={message._id}
                    direction={isUser ? "row" : "row-reverse"}
                    display="flex"
                    p={0}
                    m={0}
                  ></Stack>
                  <ListItemText
                    primary={
                      <Stack
                        direction="row-reverse"
                        justifyContent="space-between"
                      >
                        <Typography
                          variant="body2"
                          component="span"
                          textAlign="left"
                        >
                          {message.deleted && !message.imageURL
                            ? "THIS MESSAGE IS DELETED"
                            : message.message || "UNKNOWN MESSAGE"}{" "}
                        </Typography>
                      </Stack>
                    }
                    secondary={
                      <>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          paddingBottom="0"
                        >
                          <Typography
                            variant="caption"
                            component="span"
                            fontSize="0.55rem"
                          >
                            {message.deleted
                              ? `${moment(message.deletedAt)
                                  .fromNow()
                                  .toLocaleUpperCase()} DELETED`
                              : message.edited
                              ? `${moment(message.editedAt)
                                  .fromNow()
                                  .toLocaleUpperCase()} EDITED`
                              : `${moment(message.createdAt)
                                  .fromNow()
                                  .toLocaleUpperCase()}`}
                          </Typography>
                        </Stack>
                      </>
                    }
                  />
                </ListItemButton>
                {isUser && (
                  <ListItemAvatar>
                    <Avatar alt={user.fullName} src={user.avatarURL} />
                  </ListItemAvatar>
                )}
              </ListItem>
            );
          })}
        </List>
        <MessageInput />
      </Container>
    </>
  );
}
