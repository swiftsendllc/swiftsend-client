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
  selectedMessage
}: {
  isOpen: boolean;
  onClose?: () => unknown;
  selectedMessage:MessagesEntity
}) => {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const { sendMessageReactions } = useMessageAPI();


  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };
  const handleEmojiReaction = async ( reaction: string) => {
    try {
      await sendMessageReactions({
        messageId: selectedMessage._id,
        reaction,
      });
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
                  handleEmojiReaction(option.label)
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
