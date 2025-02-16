'use client';

import { MessagesEntity } from '@/hooks/entities/messages.entities';
import EditIcon from '@mui/icons-material/Edit';
import { Chip, IconButton, Stack, Typography } from '@mui/material';
import moment from 'moment';

import { UserContext } from '@/hooks/context/user-context';
import { useContext, useState } from 'react';
import ImageThumbnail from './ImageThumbnail';
import InfoMessageDrawer from './InfoMessageDrawer';

export default function MessageThreadImage({
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
      <Stack direction="column" justifyContent="left">
        <ImageThumbnail message={message} />
        <Chip
          label={
            <Typography variant="caption" component="span" fontSize="0.55rem">
              {message.deleted
                ? `${moment(message.deletedAt)
                    .fromNow()
                    .toLocaleUpperCase()} DELETED`
                : message.edited
                  ? `${moment(message.editedAt)
                      .fromNow()
                      .toLocaleUpperCase()} EDITED`
                  : `${moment(message.createdAt).fromNow().toLocaleUpperCase()}`}
            </Typography>
          }
          icon={
            <>
              {isUser ? (
                <IconButton
                  onClick={() => {
                    setInfoMessageDrawer(true);
                  }}
                >
                  <EditIcon sx={{ width: 15, height: 15 }} />
                </IconButton>
              ) : undefined}
            </>
          }
          variant="outlined"
        />
        <InfoMessageDrawer
          isOpen={infoMessageDrawer}
          onClose={() => setInfoMessageDrawer(false)}
          message={message}
          setMessages={setMessages}
        />
      </Stack>
    </>
  );
}
