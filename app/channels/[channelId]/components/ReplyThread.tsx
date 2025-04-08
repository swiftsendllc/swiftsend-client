'use client';

import { MessagesEntity } from '@/hooks/entities/messages.entities';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, Card, CardHeader, Container, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

export function ReplyThread({
  isReplying,
  onClose,
  repliedToMessage
}: {
  repliedToMessage: MessagesEntity | null;
  isReplying: boolean;
  onClose?: () => unknown;
}) {
  const [open, setOpen] = useState<boolean>(isReplying);
  useEffect(() => setOpen(isReplying), [isReplying]);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };
  return (
    <>
      {repliedToMessage && open && (
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
                    src={repliedToMessage.sender.avatarURL}
                    alt={repliedToMessage.sender.fullName}
                  />
                }
                title={repliedToMessage.sender.fullName}
                subheader={repliedToMessage.message}
                action={
                  <IconButton aria-labelledby="cancel-replying" onClick={handleClose}>
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
