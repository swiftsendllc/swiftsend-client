"use client";

import { UserContext } from "@/hooks/context/user-context";
import { MessagesEntity } from "@/hooks/entities/messages.entities";
import { DoneAll } from "@mui/icons-material";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";

import {
  Checkbox,
  IconButton,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { Dispatch, SetStateAction, useContext } from "react";

export const MessageThreadListPage = ({
  idx,
  message,
  checkBox,
  setInfoMessageDrawer,
  setSelectedMessage,
  setEmojiDrawer,
  selectedMessageIds,
  onToggleCheckBox,
}: // onDeleteMessageReactions,
{
  idx: number;
  message: MessagesEntity;
  checkBox: boolean;
  setSelectedMessageIds: Dispatch<SetStateAction<string[]>>;
  setSelectedMessage: Dispatch<SetStateAction<MessagesEntity | null>>;
  setEmojiDrawer: Dispatch<SetStateAction<boolean>>;
  selectedMessageIds: string[];
  setInfoMessageDrawer: Dispatch<SetStateAction<boolean>>;
  onToggleCheckBox: (message: string) => unknown;
  // onDeleteMessageReactions: (emoji: string) => unknown
}) => {
  const [user] = useContext(UserContext);
  const isUser = user.userId === message.senderId;
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
          key={idx}
          direction={isUser ? "row" : "row-reverse"}
          display="flex"
          p={0}
          m={0}
        ></Stack>
        <ListItemText
          primary={
            <Stack direction="row-reverse" justifyContent="space-between">
              <Typography variant="body2" component="span" textAlign="right">
                {message.deleted && !message.imageURL
                  ? "THIS MESSAGE IS DELETED"
                  : message.message || "UNKNOWN MESSAGE"}{" "}
              </Typography>

              {isUser && checkBox && !message.deleted ? (
                <Checkbox
                  checked={selectedMessageIds.includes(message._id)}
                  onChange={() => onToggleCheckBox(message._id)}
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
                  {!isUser && !message.deleted && (
                    <IconButton
                      sx={{ mt: 0 }}
                      onClick={() => {
                        setEmojiDrawer(true);
                        setSelectedMessage(message);
                      }}
                    >
                      <AddReactionIcon sx={{ width: 13, height: 13 }} />
                    </IconButton>
                  )}

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
                      ) : (
                        <IconButton sx={{ mt: 0 }}>
                          <DoneIcon sx={{ width: 13, height: 13 }} />
                        </IconButton>
                      )}
                    </Typography>
                  )}
                </Stack>
              </Stack>
              {message.reactions !== undefined && !message.deleted ? (
                <IconButton
                  sx={{ p: 0, m: 0, display: "flex" }}
                  // onClick={() =>
                  //   message.reactions.map((emoji) =>
                  //     isUser ? null : onDeleteMessageReactions(emoji._id)
                  //   )
                  // }
                >
                  <div style={{ width: 1, height: 1 }}>
                    {message.reactions.map((emoji) => emoji.reaction)}
                  </div>
                </IconButton>
              ) : null}
            </>
          }
        />
      </ListItemButton>
    </>
  );
};
