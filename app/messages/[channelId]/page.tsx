"use client";

import MessageInput from "@/components/MessageInput";
import { ChannelContext } from "@/hooks/channel-context";
import { UserProfilesEntity } from "@/hooks/types";
import useAPI from "@/hooks/useAPI";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
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

  const loadChannelMessages = async () => {
    try {
      if (channelId) {
        const message = await getChannelMessages(channelId as string);
        setMessages(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (channelId) loadChannelMessages();
  }, [channelId]);

  return (
    <>
      <Container maxWidth="xs" style={{ padding: 0 }} sx={{ mt: 2 }}>
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

        {messages.map((message, idx) => (
          <Fragment key={idx}>
            <Divider />
            <Stack spacing={2} mt={2}>
              <Card
                sx={{
                  width: "50%",
                  borderRadius: "30px",
                  display: "flex",
                  flexDirection:
                    message.senderId === message.receiver.userId
                      ? "row-reverse"
                      : "row",
                }}
              >
                <CardHeader
                  action={
                    <Button
                      sx={{ height: 20, fontWeight: 200 }}
                      aria-label="settings"
                      variant="text"
                    >
                      <AddIcon />
                    </Button>
                  }
                  subheader={`${message.message} • ${new Date(
                    message.createdAt
                  ).toLocaleString()}`}
                />
                <Typography variant="body2">{message.message}</Typography>
              </Card>
            </Stack>
          </Fragment>
        ))}

        {messages && <MessageInput onMessage={() => null} />}
      </Container>
    </>
  );
}
