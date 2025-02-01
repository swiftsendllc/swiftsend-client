"use client";

import {
  ChannelsEntity,
  MessagesEntity,
} from "@/hooks/entities/messages.entities";
import { UserProfilesEntity } from "@/hooks/entities/users.entities";
import { DoneAll } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";

import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import Image from "next/image";
import React, { SetStateAction, useState } from "react";
import InfoMessageDrawer from "./InfoMessageDrawer";

export const MessageBubblePage = ({
  messages,
  channel,
  user,
  setMessages,
}: {
  messages: MessagesEntity[];
  channel: ChannelsEntity;
  user: UserProfilesEntity;
  setMessages: React.Dispatch<SetStateAction<MessagesEntity[]>>;
}) => {
  const [selectedMessage, setSelectedMessage] = useState<MessagesEntity | null>(
    null
  );
  const [infoMessageDrawer, setInfoMessageDrawer] = useState(false);
  return (
    <>
      {selectedMessage && (
        <InfoMessageDrawer
          isOpen={infoMessageDrawer}
          onClose={() => setInfoMessageDrawer(false)}
          message={selectedMessage}
          setMessages={setMessages}
        />
      )}
      {messages.map((message, idx) => {
        const isUser = user.userId === message.senderId;
        return (
          <ListItem
            key={idx}
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
                <Avatar
                  alt={channel.receiver.fullName}
                  src={channel.receiver.avatarURL}
                />
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
              <ListItemText
                primary={
                  <Typography variant="body2" textAlign="right">
                    {message.deleted
                      ? "This message was deleted"
                      : message.message || "unknown message"}{" "}
                  </Typography>
                }
                secondary={
                  <>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      paddingBottom="0"
                    >
                      <Typography variant="caption" fontSize=".55rem">
                        {message.deleted
                          ? `${moment(message.deletedAt).fromNow()} deleted`
                          : message.edited
                          ? `${moment(message.editedAt).fromNow()} edited`
                          : `${moment(message.createdAt).fromNow()}`}
                      </Typography>
                      <Stack direction="row" justifyContent="right">
                        {isUser && !message.deleted && (
                          <IconButton
                            sx={{ mt: 0 }}
                            onClick={() => {
                              setSelectedMessage(message);
                              setInfoMessageDrawer(true);
                            }}
                          >
                            <EditIcon sx={{ width: 13, height: 13 }} />
                          </IconButton>
                        )}

                        {isUser && (
                          <Typography fontSize="0.85rem">
                            {message.seen ? (
                              <IconButton sx={{ mt: 0 }}>
                                <DoneAll sx={{ width: 13, height: 13 }} />
                              </IconButton>
                            ) : message.delivered ? (
                              <IconButton sx={{ mt: 0 }}>
                                <DoneIcon sx={{ width: 13, height: 13 }} />
                              </IconButton>
                            ) : null}
                          </Typography>
                        )}
                      </Stack>
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
            {message.imageURL && !message.deleted && (
              <Image
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                  marginBottom: "20",
                }}
                src={message.imageURL}
                alt="Image loading"
                width={400}
                height={400}
              />
            )}
          </ListItem>
        );
      })}
    </>
  );
};
