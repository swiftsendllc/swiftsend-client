'use client';

import { reactions } from '@/components/SearchComponents';
import useMessageAPI from '@/hooks/api/useMessageAPI';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import {
  Dialog,
  DialogContent,
  List,
  ListItemButton,
  ListItemText,
  Paper
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function MessageReaction({
  isOpen,
  onClose,
  message,
  setMessages
}: {
  isOpen: boolean;
  onClose?: () => unknown;
  message: MessagesEntity;
  setMessages: React.Dispatch<React.SetStateAction<MessagesEntity[]>>;
}) {
  const [open, setOpen] = useState<boolean>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const { sendMessageReactions } = useMessageAPI();

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const handleEmojiReaction = async (reaction: string) => {
    try {
      const reactionData = await sendMessageReactions({
        messageId: message._id,
        reaction
      });
      const newReactionData = reactionData;
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg._id === message._id) {
            const updatedMessageReaction = [...msg.reactions, newReactionData];
            return { ...msg, reactions: updatedMessageReaction };
          }
          return msg;
        })
      );
      handleClose();
      toast.success('REACTED');
    } catch (error) {
      console.log(error);
      toast.error('FAILED TO REACT MESSAGE!');
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          style: {
            margin: 0,
            width: '100%'
          }
        }}
        sx={{ mb: 1.5 }}
        aria-describedby="message-reaction-dialog"
      >
        <Paper>
          <DialogContent sx={{ padding: 0 }}>
            <List sx={{ display: 'flex', padding: 0, margin: 0 }}>
              {reactions.map((option, idx) => (
                <ListItemButton
                  key={idx}
                  onClick={() => handleEmojiReaction(option.label)}
                >
                  <ListItemText primary={option.icon} />
                </ListItemButton>
              ))}
            </List>
          </DialogContent>
        </Paper>
      </Dialog>
    </>
  );
}
