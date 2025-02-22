'use client';

import { UserContext } from '@/hooks/context/user-context';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import { DoneAll } from '@mui/icons-material';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import ReplyIcon from '@mui/icons-material/Reply';

import useMessageAPI from '@/hooks/api/useMessageAPI';
import {
  Box,
  Checkbox,
  IconButton,
  ListItemButton,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import InfoMessageDrawer from './InfoMessageDrawer';
import MessageReaction from './MessageReaction';

export default function MessageThreadList({
  message,
  checkBox,
  selectedMessageIds,
  onToggleCheckBox,
  setMessages,
  setIsReplying,
  setReplyMessage
}: {
  checkBox: boolean;
  message: MessagesEntity;
  selectedMessageIds: string[];
  onToggleCheckBox: (message: string) => unknown;
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
  setReplyMessage: React.Dispatch<React.SetStateAction<MessagesEntity | null>>;
  setMessages: React.Dispatch<React.SetStateAction<MessagesEntity[]>>;
  setSelectedMessageIds: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [user] = useContext(UserContext);
  const isUser = user.userId === message.senderId;
  const [infoMessageDrawer, setInfoMessageDrawer] = useState<boolean>(false);
  const [emojiDrawer, setEmojiDrawer] = useState(false);
  const { deleteMessageReactions } = useMessageAPI();

  const handleDeleteMessageReactions = async (reactionId: string) => {
    try {
      await deleteMessageReactions(reactionId);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.reactions.map((reaction) => reaction._id === reactionId)
            ? {
                ...msg,
                reactions: msg.reactions.filter(
                  (reaction) => reaction._id !== reactionId
                )
              }
            : msg
        )
      );

      toast.success('DELETED');
    } catch (error) {
      console.error(error);
      toast.error('FAILED TO DELETE REACTIONS!');
    }
  };
  return (
    <>
      <ListItemButton
        sx={{
          backgroundColor: isUser ? '#4dabf5' : '#4caf50',
          borderColor: isUser ? '#4dabf5' : '#4caf50',
          borderRadius: '10px',
          maxWidth: '60%',
          padding: '8px'
        }}
      >
        <ListItemText
          primary={
            <Stack direction="row-reverse" justifyContent="space-between">
              <Typography variant="body2" component="span" textAlign="left">
                {message.deleted && !message.imageURL && !message.repliedTo
                  ? 'THIS MESSAGE IS DELETED'
                  : message.message || 'UNKNOWN MESSAGE'}{' '}
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
                            return handleDeleteMessageReactions(emoji._id);
                          }
                        }}
                      >
                        {emoji.reaction}
                      </Box>
                    ))}
                  {!isUser && !message.deleted && (
                    <>
                      <IconButton
                        sx={{ mt: 0 }}
                        onClick={() => setEmojiDrawer(true)}
                      >
                        <AddReactionIcon sx={{ width: 13, height: 13 }} />
                      </IconButton>
                      <IconButton
                        sx={{ mt: 0 }}
                        onClick={() => {
                          setReplyMessage(message);
                          setIsReplying(true);
                        }}
                      >
                        <ReplyIcon sx={{ width: 13, height: 13 }} />
                      </IconButton>
                    </>
                  )}

                  {isUser && !message.deleted && (
                    <IconButton
                      sx={{ mt: 0 }}
                      onClick={() => {
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
            </>
          }
        />

        <InfoMessageDrawer
          isOpen={infoMessageDrawer}
          onClose={() => setInfoMessageDrawer(false)}
          message={message}
          onDelete={() =>
            setMessages((prev) =>
              prev.map((msg) =>
                msg._id === message._id
                  ? { ...msg, deleted: true, deletedAt: new Date() }
                  : msg
              )
            )
          }
          onEdit={(edited_message) =>
            setMessages((prev) =>
              prev.map((msg) =>
                msg._id === message._id
                  ? {
                      ...msg,
                      message: edited_message,
                      edited: true,
                      editedAt: new Date()
                    }
                  : msg
              )
            )
          }
        />
        <MessageReaction
          isOpen={emojiDrawer}
          onClose={() => setEmojiDrawer(false)}
          message={message}
          onReaction={(reaction) =>
            setMessages((prev) =>
              prev.map((msg) =>
                msg._id === message._id
                  ? { ...msg, reactions: [...msg.reactions, reaction] }
                  : msg
              )
            )
          }
        />
      </ListItemButton>
    </>
  );
}
