"use client";

import useMessageAPI from "@/hooks/api/useMessageAPI";
import { UserContext } from "@/hooks/context/user-context";
import AddIcon from "@mui/icons-material/Add";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsIcon from "@mui/icons-material/Settings";

import { StyledBadge } from "@/components/SearchComponents";
import { SocketContext } from "@/hooks/context/socket-context";
import { ChannelsEntity } from "@/hooks/entities/messages.entities";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  Fab,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export function ChannelList() {
  const [user] = useContext(UserContext);
  const { getChannels } = useMessageAPI();
  const [channel, setChannel] = useState<ChannelsEntity[]>([]);
  const [, setSelectedUser] = useState<ChannelsEntity | null>(null);
  const router = useRouter();
  const { onlineUsers } = useContext(SocketContext);

  const loadChannels = async () => {
    try {
      const channels = await getChannels();
      setChannel(channels);
    } catch (error) {
      console.log(error);
      toast.error(
        <Typography color="error">Failed to load channels!</Typography>
      );
    }
  };

  useEffect(() => {
    loadChannels();
  }, []); //eslint-disable-line

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
            label="𝔖𝔢𝔞𝔯𝔠𝔥"
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
        {channel.length > 0 ? (
          channel.map((channelUser, idx) => (
            <Card
              key={idx}
              sx={{ mb: 0.3, width: "100%", p: 0 }}
              onClick={() => {
                setSelectedUser(channelUser);
                router.push(`/messages/${channelUser._id}`);
              }}
            >
              <CardHeader
                avatar={
                  <>
                    {onlineUsers ? (
                      <StyledBadge
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
                    ) : (
                      <Avatar
                        aria-label="recipe"
                        src={channelUser.receiver.avatarURL}
                        alt={channelUser.receiver.fullName}
                      />
                    )}
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
                  channelUser.lastMessage
                    ? `${channelUser.lastMessage.message || ""} • ${new Date(
                        channelUser.lastMessage.createdAt
                      ).toLocaleString()}`
                    : "No messages"
                }
              />
            </Card>
          ))
        ) : (
          <Stack
            my="10"
            alignContent="center"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src="/svg-icons/sasuke.svg"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
              alt="image"
              width={300}
              height={100}
              priority
            />
            <Image
              src="/svg-icons/gun.svg"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
              alt="image"
              width={300}
              height={100}
              priority
            />
            <Typography variant="h6">
              𝔜𝔬𝔲𝔯 𝔪𝔢𝔰𝔰𝔞𝔤𝔢𝔰 𝔴𝔦𝔩𝔩 𝔞𝔭𝔭𝔢𝔞𝔯 𝔥𝔢𝔯𝔢𝔢𝔢𝔢𝔢!!!!!!
            </Typography>
          </Stack>
        )}
      </Container>
    </>
  );
}
