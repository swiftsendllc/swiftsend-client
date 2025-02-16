'use client';
import {
  ChannelsEntity,
  MessagesEntity
} from '@/hooks/entities/messages.entities';
import { UserProfilesEntity } from '@/hooks/entities/users.entities';

import { Avatar, ListItem, ListItemAvatar } from '@mui/material';
import React, { SetStateAction } from 'react';
import MessageThreadImage from './MessageThreadImage';
import MessageThreadList from './MessageThreadList';

export default function MessageThread({
  user,
  channel,
  messages,
  checkBox,
  setMessages,
  selectedMessageIds,
  setSelectedMessageIds
}: {
  checkBox: boolean;
  channel: ChannelsEntity;
  user: UserProfilesEntity;
  messages: MessagesEntity[];
  selectedMessageIds: string[];
  setMessages: React.Dispatch<SetStateAction<MessagesEntity[]>>;
  setSelectedMessageIds: React.Dispatch<SetStateAction<string[]>>;
}) {
  const handleToggleCheckBox = (messageId: string) => {
    setSelectedMessageIds((prev) => {
      const newSelectedMessageIds = prev.includes(messageId)
        ? prev.filter((id) => id !== messageId)
        : [...prev, messageId];

      return newSelectedMessageIds;
    });
  };

  return (
    <>
      {messages.map((message, idx) => {
        const isUser = user.userId === message.senderId;
        return (
          <ListItem
            key={idx}
            sx={{
              display: 'flex',
              justifyContent: isUser ? 'flex-end' : 'flex-start',
              textAlign: isUser ? 'right' : 'left',
              py: 1
            }}
            disablePadding
          >
            {!isUser && (
              <ListItemAvatar>
                <Avatar
                  alt={channel.receiver.fullName}
                  src={channel.receiver.avatarURL}
                />
              </ListItemAvatar>
            )}
            {message.imageURL ? (
              <MessageThreadImage message={message} setMessages={setMessages} />
            ) : (
              <>
                <MessageThreadList
                  idx={idx}
                  setSelectedMessageIds={setSelectedMessageIds}
                  message={message}
                  setMessages={setMessages}
                  checkBox={checkBox}
                  selectedMessageIds={selectedMessageIds}
                  onToggleCheckBox={() => handleToggleCheckBox(message._id)}
                />
              </>
            )}
            {isUser && (
              <ListItemAvatar>
                <Avatar alt={user.fullName} src={user.avatarURL} />
              </ListItemAvatar>
            )}
          </ListItem>
        );
      })}
    </>
  );
}
