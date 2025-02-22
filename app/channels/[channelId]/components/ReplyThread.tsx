'use client';

import { MessagesEntity } from '@/hooks/entities/messages.entities';
import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Container,
  IconButton
} from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function ReplyThread({
  isReplying,
  setIsReplying,
  replyMessage
}: {
  replyMessage: MessagesEntity | null;
  isReplying: boolean;
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [open, setOpen] = useState<boolean>(isReplying);
  useEffect(() => setOpen(isReplying), [isReplying]);

  const handleClose = () => {
    setOpen(false);
    setIsReplying(false);
  };
  return (
    <>
      {replyMessage && open && (
        <Box
          width="100%"
          sx={{
            position: 'fixed',
            left: 0,
            bottom: 60,
            right: 0,
            zIndex: 8,
            animation: 'fadeIn 0.3s ease-in-out'
          }}
        >
          <Container maxWidth="xs" sx={{ padding: 0 }}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="recipe"
                    src={replyMessage.receiver.avatarURL}
                    alt={replyMessage.receiver.fullName}
                  />
                }
                title={replyMessage.receiver.fullName}
                subheader={replyMessage.message}
                action={
                  <IconButton
                    aria-labelledby="cancel-replying"
                    onClick={handleClose}
                  >
                    <CloseIcon />
                  </IconButton>
                }
              />
            </Card>
          </Container>
        </Box>
      )}
    </>
  );
}
