"use client";
import {
  ChannelsEntity,
  MessagesEntity,
} from "@/hooks/entities/messages.entities";
import { UserProfilesEntity } from "@/hooks/entities/users.entities";

import { Avatar, ListItem, ListItemAvatar } from "@mui/material";
import React, { SetStateAction, useState } from "react";
import InfoMessageDrawer from "./InfoMessageDrawer";
import { MessageReactionPage } from "./MessageReaction";
import { MessageThreadImagePage } from "./MessageThreadImage";
import { MessageThreadListPage } from "./MessageThreadList";

export const MessageThreadPage = ({
  user,
  channel,
  messages,
  checkBox,
  setMessages,
  selectedMessageIds,
  setSelectedMessageIds,
}: {
  checkBox: boolean;
  channel: ChannelsEntity;
  user: UserProfilesEntity;
  messages: MessagesEntity[];
  selectedMessageIds: string[];
  setMessages: React.Dispatch<SetStateAction<MessagesEntity[]>>;
  setSelectedMessageIds: React.Dispatch<SetStateAction<string[]>>;
}) => {
  const [selectedMessage, setSelectedMessage] = useState<MessagesEntity | null>(
    null
  );
  const [infoMessageDrawer, setInfoMessageDrawer] = useState(false);
  const [emojiDrawer, setEmojiDrawer] = useState(false);
  // const { deleteMessageReactions } = useMessageAPI();

  // const handleDeleteMessageReactions = async (reactionId: string) => {
  //   try {
  //     await deleteMessageReactions(reactionId);
  //     toast.success("DELETED");
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("FAILED TO DELETE REACTIONS!");
  //   }
  // };

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
      {selectedMessage && (
        <InfoMessageDrawer
          isOpen={infoMessageDrawer}
          onClose={() => setInfoMessageDrawer(false)}
          selectedMessage={selectedMessage}
          setMessages={setMessages}
        />
      )}

      {messages.map((message, idx) => {
        const isUser = user.userId === message.senderId;
        return (
          <ListItem
            key={idx}
            sx={{
              display: "flex",
              justifyContent: isUser ? "flex-end" : "flex-start",
              textAlign: isUser ? "right" : "left",
              py: 1,
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
              <MessageThreadImagePage
                message={message}
                setSelectedMessage={setSelectedMessage}
                setInfoMessageDrawer={setInfoMessageDrawer}
              />
            ) : (
              <>
                <MessageThreadListPage
                  idx={idx}
                  setSelectedMessageIds={setSelectedMessageIds}
                  message={message}
                  checkBox={checkBox}
                  setInfoMessageDrawer={setInfoMessageDrawer}
                  setSelectedMessage={setSelectedMessage}
                  setEmojiDrawer={setEmojiDrawer}
                  selectedMessageIds={selectedMessageIds}
                  onToggleCheckBox={() => handleToggleCheckBox(message._id)}
                  // onDeleteMessageReactions={() =>
                  //   message.reactions.map((emoji) =>
                  //     handleDeleteMessageReactions(emoji._id)
                  //   )
                  // }
                />
              </>
            )}
            {isUser && (
              <ListItemAvatar>
                <Avatar alt={user.fullName} src={user.avatarURL} />
              </ListItemAvatar>
            )}
            {selectedMessage && (
              <MessageReactionPage
                isOpen={emojiDrawer}
                onClose={() => setEmojiDrawer(false)}
                selectedMessage={selectedMessage}
                setMessages={setMessages}
              />
            )}
          </ListItem>
        );
      })}
    </>
  );
};
