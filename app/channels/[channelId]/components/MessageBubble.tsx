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
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { Fragment, SetStateAction, useState } from "react";
import InfoMessageDrawer from "./InfoMessageDrawer";

export const MessageBubblePage = ({
  message,
  channel,
  user,
  setMessages,
}: {
  message: MessagesEntity;
  channel: ChannelsEntity;
  user: UserProfilesEntity;
  setMessages: React.Dispatch<SetStateAction<MessagesEntity[]>>;
}) => {
  const [selectedMessage, setSelectedMessage] = useState<MessagesEntity | null>(
    null
  );
  const [infoMessageDrawer, setInfoMessageDrawer] = useState(false);
  const isUser = user.userId === message.receiverId;
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
      <Fragment>
        <Stack
          spacing={1}
          mt={1}
          justifyContent={isUser ? "flex-start" : "flex-end"}
          alignContent={isUser ? "flex-start" : "flex-end"}
          alignItems={isUser ? "flex-start" : "flex-end"}
          // ref={idx === messages.length - 1 ? lastMessageRef : null}
        >
          <Card
            sx={{
              width: "70%",
              height: "auto",
              padding: 0,
              textAlign: isUser ? "right" : "left",
              backgroundColor: isUser ? "#4a19d2" : "#1976d2",
              color: isUser ? "#fff" : "#000",
              position: "relative",
            }}
          >
            <CardContent sx={{ padding: 0, paddingX: 1, paddingY: 1 }}>
              <Stack
                direction={isUser ? "row-reverse" : "row"}
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", textAlign: "left" }}
                >
                  {message.deleted
                    ? "This message was deleted"
                    : message.message || "unknown message"}{" "}
                </Typography>
                {isUser ? (
                  <Avatar
                    src={channel.receiver.avatarURL}
                    alt={channel.receiver.fullName}
                    sx={{ position: "relative" }}
                  />
                ) : (
                  <Avatar
                    src={user.avatarURL}
                    alt={user.fullName}
                    sx={{ position: "relative" }}
                  />
                )}
              </Stack>
            </CardContent>
            <CardHeader
              sx={{ padding: 0, paddingX: 1 }}
              action={
                !isUser && !message.deleted ? (
                  <>
                    <Stack direction="row" justifyContent="space-between">
                      <IconButton
                        sx={{ mt: 0 }}
                        onClick={() => {
                          setSelectedMessage(message);
                          setInfoMessageDrawer(true);
                        }}
                      >
                        <EditIcon sx={{ width: 13, height: 13 }} />
                      </IconButton>
                      {!isUser && (
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
                  </>
                ) : null
              }
              subheader={
                <>
                  <Typography variant="caption" fontSize=".55rem" px="1">
                    {message.deleted
                      ? `${moment(message.deletedAt).fromNow()} deleted`
                      : message.edited
                      ? `${moment(message.editedAt).fromNow()} edited`
                      : `${moment(message.createdAt).fromNow()}`}
                  </Typography>
                </>
              }
            />
            {message.imageURL && !message.deleted && (
              <CardMedia
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                  marginBottom: "20",
                }}
                component="img"
                src={message.imageURL}
                alt="Image loading"
                width={400}
                height={400}
              />
            )}
          </Card>
        </Stack>
      </Fragment>
    </>
  );
};
