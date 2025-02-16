"use client";

import useMessageAPI from "@/hooks/api/useMessageAPI";
import { UserContext } from "@/hooks/context/user-context";
import { GroupMessagesEntity } from "@/hooks/entities/messages.entities";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  IconButton,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import EmojiModal from "./EmojiModal";
import MessageInfoModal from "./MessageInfoModal";

export default function MessageThreadList({
  message,
  setMessages,
}: {
  message: GroupMessagesEntity;
  setMessages: React.Dispatch<React.SetStateAction<GroupMessagesEntity[]>>;
}) {
  const [user] = useContext(UserContext);
  const isUser = message.senderId === user.userId;
  const [messageInfoModal, setMessageInfoModal] = useState<boolean>(false);
  const [emojiModal, setEmojiModal] = useState<boolean>(false);
  const { deleteGroupReaction } = useMessageAPI();

  const handleDeleteReaction = async (reactionId: string) => {
    try {
      await deleteGroupReaction(reactionId);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.reactions.map((reaction) => reaction._id === reactionId)
            ? {
                ...msg,
                reactions: msg.reactions.filter(
                  (reaction) => reaction._id !== reactionId
                ),
              }
            : msg
        )
      );
    } catch (error) {
      console.log(error);
      toast.error("FAILED TO DELETE REACTION!");
    }
  };

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
                  {message.reactions !== undefined &&
                    message.reactions.map((emoji, idx) => (
                      <Box
                        key={idx}
                        sx={{ p: 0 }}
                        marginRight={1}
                        onClick={() => {
                          if (isUser) {
                            return null;
                          } else {
                            return handleDeleteReaction(emoji._id);
                          }
                        }}
                      >
                        {emoji.reaction}
                      </Box>
                    ))}
                  {!isUser && !message.deleted && (
                    <IconButton
                      sx={{ mt: 0, p: 0 }}
                      onClick={() => {
                        if (!message.isReacted) {
                          return setEmojiModal(true);
                        }
                      }}
                    >
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
          setMessages={setMessages}
          message={message}
          isOpen={messageInfoModal}
          onClose={() => setMessageInfoModal(false)}
        />
        <EmojiModal
          isOpen={emojiModal}
          onClose={() => setEmojiModal(false)}
          message={message}
          setMessages={setMessages}
        />
      </ListItemButton>
    </>
  );
}
