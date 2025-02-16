"use client";

import { UserContext } from "@/hooks/context/user-context";
import { GroupMessagesEntity } from "@/hooks/entities/messages.entities";
import { Avatar, ListItem, ListItemAvatar } from "@mui/material";
import React, { useContext } from "react";
import MessageThreadList from "./MessageThreadList";
import MessageThreadImage from "./MessageThreadImage";

export default function MessageThread({
  messages,
  setMessages,
}: {
  messages: GroupMessagesEntity[];
  setMessages: React.Dispatch<React.SetStateAction<GroupMessagesEntity[]>>;
}) {
  const [user] = useContext(UserContext);
  return (
    <>
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
              <>
                <ListItemAvatar>
                  <Avatar
                    alt={sender.avatarURL}
                    src={sender.avatarURL || "/svg/app_icon.svg"}
                  />
                </ListItemAvatar>
              </>
            )}
            {message.imageURL ? (
              <MessageThreadImage
                message={message}
                setMessages={setMessages}
              />
            ) : (
              <>
                <MessageThreadList
                  message={message}
                  setMessages={setMessages}
                />
              </>
            )}
            {isUser && (
              <ListItemAvatar>
                <Avatar alt={user.fullName} src={user.avatarURL} />
              </ListItemAvatar>
            )}
          </ListItem>
        );
      })}
    </>
  );
};
