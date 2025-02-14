"use client";

import { UserContext } from "@/hooks/context/user-context";
import { GroupMessagesEntity } from "@/hooks/entities/messages.entities";
import { Avatar, ListItem, ListItemAvatar } from "@mui/material";
import { useContext } from "react";
import { MessageThreadImagePage } from "./MessageThreadImage";
import { MessageThreadListPage } from "./MessageThreadList";

export const MessageThreadPage = ({
  messages,
}: {
  messages: GroupMessagesEntity[];
}) => {
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
              <MessageThreadImagePage message={message} />
            ) : (
              <MessageThreadListPage message={message} />
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
