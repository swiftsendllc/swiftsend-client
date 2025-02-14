"use client";

import { UserContext } from "@/hooks/context/user-context";
import { GroupMessagesEntity } from "@/hooks/entities/messages.entities";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useContext, useState } from "react";
import MessageInfoModal from "./MessageInfoModal";

export const MessageThreadListPage = ({
  message,
}: {
  message: GroupMessagesEntity;
}) => {
  const [user] = useContext(UserContext);
  const isUser = message.senderId === user.userId;
  const [messageInfoModal, setMessageInfoModal] = useState<boolean>(false);
  return (
    <>
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
            <Stack direction="row" justifyContent="space-between">
              {!isUser && (
                <Typography variant="subtitle2" fontSize="0.65rem">
                  {message.sender.fullName}
                </Typography>
              )}
              <Typography variant="body2" component="span" textAlign="left">
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
                <Stack direction="row" justifyContent="right" padding={0}>
                  {!isUser && !message.deleted && (
                    <IconButton sx={{ mt: 0, p: 0 }}>
                      <AddReactionIcon sx={{ width: 13, height: 13 }} />
                    </IconButton>
                  )}

                  {isUser && !message.deleted && (
                    <IconButton
                      sx={{ mt: 0, p: 0 }}
                      onClick={() => setMessageInfoModal(true)}
                    >
                      <EditIcon sx={{ width: 13, height: 13 }} />
                    </IconButton>
                  )}
                </Stack>
              </Stack>
            </>
          }
        />
        <MessageInfoModal
          message={message}
          isOpen={messageInfoModal}
          onClose={() => setMessageInfoModal(false)}
        />
      </ListItemButton>
    </>
  );
};
