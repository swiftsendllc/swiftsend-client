import { MessagesEntity } from '@/hooks/entities/messages.entities';
import EditIcon from '@mui/icons-material/Edit';
import { CardContent, Chip, IconButton, Paper, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { UserContext } from '@/hooks/context/user-context';
import { useContext, useState } from 'react';
import {ImageThumbnail} from './ImageThumbnail';
import {InfoMessageDrawer} from './InfoMessageDrawer';

export function MessageThreadImage({
  message,
  setMessages
}: {
  message: MessagesEntity;
  setMessages: React.Dispatch<React.SetStateAction<MessagesEntity[]>>;
}) {
  const [user] = useContext(UserContext);
  const isUser = user.userId === message.senderId;
  const [infoMessageDrawer, setInfoMessageDrawer] = useState<boolean>(false);

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          maxWidth: 400
        }}
      >
        <CardContent>
          <Stack spacing={1} alignItems="flex-start">
            <ImageThumbnail message={message} />
            <Typography variant="body1" color="textPrimary" sx={{ wordBreak: 'break-word' }}>
              {message.message}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                label={
                  <Typography variant="caption" fontSize="0.7rem" color="textSecondary">
                    {message.deleted
                      ? `${moment(message.deletedAt).fromNow().toUpperCase()} DELETED`
                      : message.edited
                        ? `${moment(message.editedAt).fromNow().toUpperCase()} EDITED`
                        : `${moment(message.createdAt).fromNow().toUpperCase()}`}
                  </Typography>
                }
                variant="outlined"
                size="small"
              />
              {isUser && (
                <IconButton size="small" onClick={() => setInfoMessageDrawer(true)} sx={{ ml: 'auto' }}>
                  <EditIcon fontSize="small" />
                </IconButton>
              )}
            </Stack>
          </Stack>
        </CardContent>
        <InfoMessageDrawer
          isOpen={infoMessageDrawer}
          onClose={() => setInfoMessageDrawer(false)}
          message={message}
          onDelete={() => {
            setMessages((prev) =>
              prev.map((msg) => (msg._id === message._id ? { ...msg, deleted: true, deletedAt: new Date() } : msg))
            );
          }}
          onEdit={(edit_msg) =>
            setMessages((prev) =>
              prev.map((msg) =>
                msg._id === message._id
                  ? {
                      ...msg,
                      message: edit_msg,
                      edited: true,
                      editedAt: new Date()
                    }
                  : msg
              )
            )
          }
        />
      </Paper>
    </>
  );
}
