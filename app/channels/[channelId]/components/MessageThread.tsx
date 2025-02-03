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
  Chip,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import React, { SetStateAction, useState } from "react";
import { ImageThumbnailPage } from "./ImageThumbnail";
import InfoMessageDrawer from "./InfoMessageDrawer";

export const MessageThreadPage = ({
  user,
  channel,
  messages,
  checkBox,
  setMessages,
  selectedMessageIds,
  setSelectedMessageIds,
}: {
  checkBox: boolean;
  channel: ChannelsEntity;
  user: UserProfilesEntity;
  messages: MessagesEntity[];
  selectedMessageIds: string[];
  setMessages: React.Dispatch<SetStateAction<MessagesEntity[]>>;
  setSelectedMessageIds: React.Dispatch<SetStateAction<string[]>>;
}) => {
  const [selectedMessage, setSelectedMessage] = useState<MessagesEntity | null>(
    null
  );
  const [infoMessageDrawer, setInfoMessageDrawer] = useState(false);

  const handleToggleCheckBox = (messageId: string) => {
    setSelectedMessageIds((prev) => {
      const newSelectedMessageIds = prev.includes(messageId)
        ? prev.filter((id) => id !== messageId)
        : [...prev, messageId];

      return newSelectedMessageIds;
    });
  };

  return (
    <>
      {selectedMessage && (
        <InfoMessageDrawer
          isOpen={infoMessageDrawer}
          onClose={() => setInfoMessageDrawer(false)}
          selectedMessage={selectedMessage}
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
            {message.imageURL ? (
              <Stack direction="column" justifyContent="left">
                <ImageThumbnailPage message={message} />
                <Chip
                  label={
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
                  }
                  icon={
                    isUser ? (
                      <IconButton
                        onClick={() => {
                          setSelectedMessage(message);
                          setInfoMessageDrawer(true);
                        }}
                      >
                        <EditIcon sx={{ width: 15, height: 15 }} />
                      </IconButton>
                    ) : undefined
                  }
                  variant="outlined"
                />
              </Stack>
            ) : (
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
                    <Stack
                      direction="row-reverse"
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="body2"
                        component="span"
                        textAlign="right"
                      >
                        {message.deleted && !message.imageURL
                          ? "THIS MESSAGE IS DELETED"
                          : message.message || "UNKNOWN MESSAGE"}{" "}
                      </Typography>
                      {isUser && checkBox ? (
                        <Checkbox
                          checked={selectedMessageIds.includes(message._id)}
                          onChange={() => handleToggleCheckBox(message._id)}
                        />
                      ) : null}
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
                            <Typography component="span" fontSize="0.85rem">
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
