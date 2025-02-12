"use client";

import { UserContext } from "@/hooks/context/user-context";
import { GroupMessagesEntity } from "@/hooks/entities/messages.entities";
import { ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useContext } from "react";

export const GroupMessageThreadListPage = ({
  message,
}: {
  message: GroupMessagesEntity;
}) => {
  const [user] = useContext(UserContext);
  const isUser = message.senderId === user.userId;
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
              </Stack>
            </>
          }
        />
      </ListItemButton>
    </>
  );
};
