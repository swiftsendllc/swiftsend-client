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
import { useContext, useState } from "react";
import MessageInfoModal from "./MessageInfoModal";

export default function MessageThreadImage({
  setMessages,
  message,
}: {
  message: GroupMessagesEntity;
  setMessages: React.Dispatch<React.SetStateAction<GroupMessagesEntity[]>>;
}) {
  const [user] = useContext(UserContext);
  const isUser = user.userId === message.senderId;
  const [messageInfoModal, setMessageInfoModal] = useState<boolean>(false);
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
                <IconButton onClick={() => setMessageInfoModal(true)}>
                  <EditIcon sx={{ width: 15, height: 15 }} />
                </IconButton>
              ) : undefined}
            </>
          }
          variant="outlined"
        />
      </Stack>
      <MessageInfoModal
        setMessages={setMessages}
        isOpen={messageInfoModal}
        onClose={() => setMessageInfoModal(false)}
        message={message}
      />
    </>
  );
}
