'use client';

import { StyledBadge } from '@/components/SearchComponents';
import { UserContext } from '@/hooks/context/user-context';
import { GroupMessagesEntity } from '@/hooks/entities/messages.entities';
import { Avatar, ListItem, ListItemAvatar } from '@mui/material';
import React, { useContext } from 'react';
import MessageThreadImage from './MessageThreadImage';
import MessageThreadList from './MessageThreadList';

export default function MessageThread({
  messages,
  setMessages,
  setIsReplying,
  setReplyMessage
}: {
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
  messages: GroupMessagesEntity[];
  setMessages: React.Dispatch<React.SetStateAction<GroupMessagesEntity[]>>;
  setReplyMessage: React.Dispatch<React.SetStateAction<GroupMessagesEntity | null>>;
}) {
  const [user] = useContext(UserContext);
  return (
    <>
      {messages.map((message) => {
        const isUser = user.userId === message.senderId;
        const sender = message.sender;
        return (
          <ListItem
            key={message._id}
            sx={{
              display: 'flex',
              justifyContent: isUser ? 'flex-end' : 'flex-start',
              textAlign: isUser ? 'right' : 'left',
              py: 1
            }}
            disablePadding
          >
            {!isUser && (
              <>
                <ListItemAvatar>
                  <StyledBadge
                    isOnline={sender.isOnline}
                    badgeContent
                    variant="dot"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    overlap="circular"
                  >
                    <Avatar alt={sender.avatarURL} src={sender.avatarURL || '/svg/app_icon.svg'} />
                  </StyledBadge>
                </ListItemAvatar>
              </>
            )}
            {message.imageURL ? (
              <MessageThreadImage message={message} setMessages={setMessages} />
            ) : (
              <>
                <MessageThreadList
                  message={message}
                  setMessages={setMessages}
                  setIsReplying={setIsReplying}
                  setReplyMessage={setReplyMessage}
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
