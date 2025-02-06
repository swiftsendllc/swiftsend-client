"use client";

import { reactions } from "@/components/SearchComponents";
import useMessageAPI from "@/hooks/api/useMessageAPI";
import { MessagesEntity } from "@/hooks/entities/messages.entities";
import { List, ListItemButton, ListItemText, Popover } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const MessageReactionPage = ({
  isOpen,
  onClose,
  selectedMessage,
  setMessages,
}: {
  isOpen: boolean;
  onClose?: () => unknown;
  selectedMessage: MessagesEntity;
  setMessages: React.Dispatch<React.SetStateAction<MessagesEntity[]>>;
}) => {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const { sendMessageReactions } = useMessageAPI();

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };
  const handleEmojiReaction = async (reaction: string) => {
    try {
      const reactionData = await sendMessageReactions({
        messageId: selectedMessage._id,
        reaction,
      });
      const newReactionData = reactionData;
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg._id === selectedMessage._id) {
            const updatedMessageReaction = [...msg.reactions, newReactionData];
            return { ...msg, reactions: updatedMessageReaction };
          }
          return msg;
        })
      );
      toast.success("REACTED");
    } catch (error) {
      console.log(error);
      toast.error("FAILED TO REACT MESSAGE!");
    }
  };

  return (
    <>
      <Popover
        open={open}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        onClose={handleClose}
      >
        <List
          sx={{
            display: "flex",
          }}
        >
          {reactions.map((option, idx) => (
            <Fragment key={idx}>
              <ListItemButton
                onClick={() => {
                  handleEmojiReaction(option.label);
                  handleClose();
                }}
              >
                <ListItemText primary={option.icon} />
              </ListItemButton>
            </Fragment>
          ))}
        </List>
      </Popover>
    </>
  );
};
