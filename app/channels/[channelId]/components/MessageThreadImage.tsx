"use client";

import { MessagesEntity } from "@/hooks/entities/messages.entities";
import EditIcon from "@mui/icons-material/Edit";
import { Chip, IconButton, Stack, Typography } from "@mui/material";
import moment from "moment";

import { UserContext } from "@/hooks/context/user-context";
import { Dispatch, SetStateAction, useContext } from "react";
import { ImageThumbnailPage } from "./ImageThumbnail";

export const MessageThreadImagePage = ({
  message,
  setSelectedMessage,
  setInfoMessageDrawer,
}: {
  message: MessagesEntity;
  setSelectedMessage: React.Dispatch<React.SetStateAction<MessagesEntity | null>>;
  setInfoMessageDrawer: Dispatch<SetStateAction<boolean>>;
}) => {
  const [user] = useContext(UserContext);
  const isUser = user.userId === message.senderId;
  return (
    <>
      <Stack direction="column" justifyContent="left">
        <ImageThumbnailPage message={message} />
        <Chip
          label={
            <Typography variant="caption" component="span" fontSize="0.55rem">
              {message.deleted
                ? `${moment(message.deletedAt)
                    .fromNow()
                    .toLocaleUpperCase()} DELETED`
                : message.edited
                ? `${moment(message.editedAt)
                    .fromNow()
                    .toLocaleUpperCase()} EDITED`
                : `${moment(message.createdAt).fromNow().toLocaleUpperCase()}`}
            </Typography>
          }
          icon={
            <>
              {isUser ? (
                <IconButton
                  onClick={() => {
                    setSelectedMessage(message);
                    setInfoMessageDrawer(true);
                  }}
                >
                  <EditIcon sx={{ width: 15, height: 15 }} />
                </IconButton>
              ) : undefined}
            </>
          }
          variant="outlined"
        />
      </Stack>
    </>
  );
};
