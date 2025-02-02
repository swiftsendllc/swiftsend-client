"use client";

import { UserContext } from "@/hooks/context/user-context";
import AddIcon from "@mui/icons-material/Add";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsIcon from "@mui/icons-material/Settings";

import { StyledBadge } from "@/components/SearchComponents";
import { ChannelsContext } from "@/hooks/context/channels-context";
import { useSocket } from "@/hooks/context/socket-context";
import {
  ChannelsEntity,
  MessagesEntity,
} from "@/hooks/entities/messages.entities";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  Fab,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { setCookie } from "cookies-next";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export function ChannelPage() {
  const [user] = useContext(UserContext);
  const [, setSelectedUser] = useState<ChannelsEntity | null>(null);
  const router = useRouter();
  const { socket } = useSocket();
  const [channels, setChannels] = useContext(ChannelsContext);

  useEffect(() => {
    socket.on("newMessage", (message: MessagesEntity) => {
      setChannels((channels) => {
        return channels.map((channel) =>
          channel._id === message.channelId
            ? { ...channel, lastMessage: message }
            : channel
        );
      });
    });

    socket.on(
      "messageDeleted",
      (message: {
        messageId: string;
        deleted: boolean;
        deletedAt: Date;
        message: string;
      }) => {
        setChannels((channels) => {
          return channels.map((channel) =>
            channel.lastMessage?._id === message.messageId
              ? {
                  ...channel,
                  lastMessage: {
                    ...channel.lastMessage,
                    deleted: message.deleted,
                    deletedAt: message.deletedAt,
                    message: "",
                  },
                }
              : channel
          );
        });
      }
    );
    socket.on(
      "messageEdited",
      (editedMessage: {
        messageId: string;
        message: string;
        editedAt: Date;
        edited: true;
      }) => {
        setChannels((channels) => {
          return channels.map((channel) =>
            channel.lastMessage?._id === editedMessage.messageId
              ? {
                  ...channel,
                  lastMessage: {
                    ...channel.lastMessage,
                    edited: editedMessage.edited,
                    editedAt: editedMessage.editedAt,
                    message: editedMessage.message,
                  },
                }
              : channel
          );
        });
      }
    );

    socket.on("onlineUsers", (users: string[]) => {
      setCookie("onlineUsers", JSON.stringify(users));
    });

    return () => {
      socket.off("newMessage");
      socket.off("onlineUsers");
      socket.off("messageDeleted");
      socket.off("messageEdited");
    };
  }, [setChannels]); //eslint-disable-line

  return (
    <>
      <Container maxWidth="xs" style={{ padding: 0 }} sx={{ mb: 5, mt: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignContent="center"
          alignItems="center"
        >
          <Avatar
            src={user.avatarURL}
            alt="Profile picture"
            sx={{ width: 40, height: 40 }}
          />

          <TextField
            sx={{ width: "60%" }}
            label="Search"
            slotProps={{
              input: {
                sx: { borderRadius: "10px" },
              },
            }}
          />

          <Fab
            sx={{ width: 40, height: 40 }}
            color="primary"
            aria-label="edit"
            variant="circular"
          >
            <NotificationsNoneOutlinedIcon />
          </Fab>
          <Fab
            sx={{ width: 40, height: 40 }}
            color="secondary"
            aria-label="edit"
            variant="circular"
          >
            <SettingsIcon />
          </Fab>
        </Stack>
        <Divider sx={{ mt: 1 }} />
        {channels.length > 0 ? (
          channels.map((channelUser, idx) => {
            return (
              <Card
                key={idx}
                sx={{ mb: 0.3, width: "100%", p: 0 }}
                onClick={() => {
                  setSelectedUser(channelUser);
                  router.push(`/channels/${channelUser._id}`);
                }}
              >
                <CardHeader
                  avatar={
                    <>
                      <StyledBadge
                        isOnline={channelUser.receiver.isOnline}
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        badgeContent
                        variant="dot"
                      >
                        <Avatar
                          aria-label="recipe"
                          src={channelUser.receiver.avatarURL}
                          alt={channelUser.receiver.fullName}
                        />
                      </StyledBadge>
                    </>
                  }
                  action={
                    <Button
                      sx={{ height: 20, fontWeight: 200 }}
                      aria-label="settings"
                      variant="text"
                    >
                      <AddIcon />
                    </Button>
                  }
                  title={channelUser.receiver.fullName}
                  subheader={
                    channelUser.lastMessage?.imageURL
                      ? "Image"
                      : channelUser.lastMessage?.deleted
                      ? "This message was deleted"
                      : channelUser.lastMessage?.edited
                      ? `${
                          channelUser.lastMessage.message.slice(0, 10) || ""
                        }... • ${moment(
                          channelUser.lastMessage.editedAt
                        ).format("hh:mm A")}`
                      : `${
                          channelUser.lastMessage?.message.slice(0, 10) || ""
                        }... • ${moment(
                          channelUser.lastMessage?.createdAt
                        ).format("hh:mm A")}`
                  }
                />
              </Card>
            );
          })
        ) : (
          <Stack my="10" sx={{ width: "100%" }} spacing={2}>
            <LinearProgress color="warning" />
            <Stack p={20}>
              <CircularProgress color="error" />
            </Stack>
            <Typography
              justifyContent="center"
              textAlign="center"
              color="warning"
              variant="body1"
            >
              There is an error while loading the page
            </Typography>
          </Stack>
        )}
      </Container>
    </>
  );
}
