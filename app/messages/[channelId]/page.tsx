"use client";

import MessageInput from "@/components/MessageInput";
import { ChannelContext } from "@/hooks/channel-context";
import { UserProfilesEntity } from "@/hooks/types";
import useAPI from "@/hooks/useAPI";
import { UserContext } from "@/hooks/user-context";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { Fragment, useContext, useEffect, useState } from "react";

interface ChannelData {
  _id: string;
  senderId: string;
  receiverId: string;
  channelId: string;
  message: string;
  imageURL: string | null;
  createdAt: Date;
  receiver: UserProfilesEntity;
}

export default function SingleMessage() {
  const { getChannelMessages } = useAPI();
  const [messages, setMessages] = useState<ChannelData[]>([]);
  const { channelId } = useParams();
  const router = useRouter();
  const [channel] = useContext(ChannelContext);
  const [user] = useContext(UserContext);

  const loadChannelMessages = async () => {
    try {
      const message = await getChannelMessages(channelId as string);
      setMessages(message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (channelId) loadChannelMessages();
  }, [channelId]); // eslint-disable-line

  return (
    <>
      <Container maxWidth="xs" style={{ padding: 0 }} sx={{ mb: 8, mt: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignContent="center"
          alignItems="center"
        >
          <Card sx={{ mb: 0.5, width: "100%", padding: 0, m: 0 }}>
            <CardHeader
              avatar={
                <>
                  <IconButton onClick={() => router.back()}>
                    <ArrowBackOutlinedIcon />
                  </IconButton>
                  <Avatar
                    aria-label="recipe"
                    src={channel.receiver.avatarURL}
                    alt={channel.receiver.fullName}
                  />
                </>
              }
              title={channel.receiver.fullName}
              action={<FilterAltOutlinedIcon />}
            />
          </Card>
        </Stack>
        <Divider />

        {messages.map((message, idx) => (
          <Fragment key={idx}>
            <Stack
              spacing={1}
              mt={1}
              justifyContent={
                user.userId === message.receiverId ? "flex-start" : "flex-end"
              }
              alignContent={
                user.userId === message.receiverId ? "flex-start" : "flex-end"
              }
              alignItems={
                user.userId === message.receiverId ? "flex-start" : "flex-end"
              }
            >
              <Card
                sx={{
                  width: "50%",
                  height: "auto",
                  borderRadius: "30px",
                  backgroundColor:
                    user.userId === message.receiverId ? "#4a19d2" : "#1976d2",
                  color: user.userId === message.receiverId ? "#fff" : "#000",
                  textAlign:
                    user.userId === message.receiverId ? "left" : "right",
                }}
              >
                <CardHeader
                  action={
                    <Button
                      sx={{ height: 20, fontWeight: 200 }}
                      aria-label="settings"
                      variant="text"
                    >
                      <AutoAwesomeIcon sx={{ width: 20, height: 20 }} />
                    </Button>
                  }
                  title={
                    <Typography fontWeight={200}>
                      {typeof message.message === "string"
                        ? message.message
                        : ""}
                    </Typography>
                  }
                  subheader={
                    <Typography variant="caption" fontSize=".55rem">
                      {new Date(message.createdAt).toLocaleString()}
                    </Typography>
                  }
                />
              </Card>
            </Stack>
          </Fragment>
        ))}

        {messages && <MessageInput onMessage={() => null} />}
      </Container>
    </>
  );
}
