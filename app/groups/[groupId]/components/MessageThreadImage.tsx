"use client";

import { GroupMessagesEntity } from "@/hooks/entities/messages.entities";
import EditIcon from "@mui/icons-material/Edit";
import {
  Chip,
  IconButton,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";

import { UserContext } from "@/hooks/context/user-context";
import Image from "next/image";
import { useContext } from "react";

export const MessageThreadImagePage = ({
  message,
}: {
  message: GroupMessagesEntity;
}) => {
  const [user] = useContext(UserContext);
  const isUser = user.userId === message.senderId;
  return (
    <>
      <Stack direction="column" justifyContent="left">
        <ImageListItem>
          <Image
            width={100}
            height={100}
            src={message.imageURL}
            alt="IMAGE"
            priority
          />
        </ImageListItem>
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
                <IconButton>
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
