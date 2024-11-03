"use client";

import { ChannelsEntity } from "@/hooks/types";
import useAPI from "@/hooks/useAPI";
import { UserContext } from "@/hooks/user-context";
import AddIcon from "@mui/icons-material/Add";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

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

export function ChannelList() {
  const [user] = useContext(UserContext);
  const { getChannels } = useAPI();
  const [channel, setChannel] = useState<ChannelsEntity[]>([]);
  const router = useRouter();

  const loadChannels = async () => {
    try {
      const channels = await getChannels();
      setChannel(channels);
    } catch (error) {
      console.log(error);
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
            <BookmarkBorderOutlinedIcon />
          </Fab>
        </Stack>
        <Divider sx={{ mt: 1 }} />
        {channel.length > 0 ? (
          channel.map((channelUser, idx) => (
            <Card
              key={idx}
              sx={{ mb: 0.3, width: "100%", p: 0 }}
              onClick={() => {
                router.push(`/messages/${channelUser._id}`);
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="recipe"
                    src={channelUser.receiver.avatarURL}
                    alt={channelUser.receiver.fullName}
                  />
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
                    ? `${channelUser.lastMessage.message} • ${new Date(
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
            <Typography variant="h6">𝔜𝔬𝔲𝔯 𝔪𝔢𝔰𝔰𝔞𝔤𝔢𝔰 𝔴𝔦𝔩𝔩 𝔞𝔭𝔭𝔢𝔞𝔯 𝔥𝔢𝔯𝔢𝔢𝔢𝔢𝔢!!!!!!</Typography>
          </Stack>
        )}
      </Container>
    </>
  );
}
