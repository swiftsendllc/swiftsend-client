"use client";

import MessageInput from "@/components/MessageInput";
import { ChannelContext } from "@/hooks/channel-context";
import { UserProfilesEntity } from "@/hooks/types";
import useMessageAPI from "@/hooks/useMessageAPI";
import { UserContext } from "@/hooks/user-context";
import styled from "@emotion/styled";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
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
  const { getChannelMessages } = useMessageAPI();
  const [messages, setMessages] = useState<ChannelData[]>([]);
  const { channelId } = useParams();
  const router = useRouter();
  const [channel] = useContext(ChannelContext);
  const [user] = useContext(UserContext);

  const SmallAvatar = styled(Avatar)(() => ({
    color: "#80EF80",
    width: 15,
    height: 15,
    border: `2px solid `,
  }));

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
      <Container
        maxWidth="xs"
        style={{ padding: 0 }}
        sx={{ mb: 8, height: 80 }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignContent="center"
          alignItems="center"
        >
          <Card sx={{ width: "100%", padding: 0, pt: 0 }}>
            <CardHeader
              avatar={
                <>
                  <IconButton onClick={() => router.back()}>
                    <ArrowBackOutlinedIcon />
                  </IconButton>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <SmallAvatar src={channel.receiver.avatarURL} />
                    }
                  >
                    <Avatar
                      aria-label="recipe"
                      src={channel.receiver.avatarURL}
                      alt={channel.receiver.fullName}
                    />
                  </Badge>
                </>
              }
              title={channel.receiver.fullName}
              action={<FilterAltOutlinedIcon />}
            />
          </Card>
        </Stack>
        <Divider />
        {messages.length > 0 ? (
          messages.map((message, idx) => {
            const isUser = user.userId === message.receiverId;
            return (
              <Fragment key={idx}>
                <Stack
                  spacing={1}
                  mt={1}
                  justifyContent={isUser ? "flex-start" : "flex-end"}
                  alignContent={isUser ? "flex-start" : "flex-end"}
                  alignItems={isUser ? "flex-start" : "flex-end"}
                >
                  <Card
                    sx={{
                      width: "70%",
                      height: "auto",
                      borderRadius: "30px",
                      backgroundColor: isUser ? "#4a19d2" : "#1976d2",
                      color: isUser ? "#fff" : "#000",
                      textAlign: isUser ? "left" : "right",
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
            );
          })
        ) : (
          <Stack
            my="10"
            alignContent="center"
            alignItems="center"
            justifyContent="center"
          >
            <Stack direction="row" spacing={2} my={2}>
              <Avatar src={user.avatarURL} />
              <Avatar src={channel.receiver.avatarURL} />
            </Stack>

            <Typography variant="h6" fontWeight="50" my={3}>
              𝔜𝔬𝔲 𝔞𝔯𝔢 𝔠𝔬𝔫𝔫𝔢𝔠𝔱𝔦𝔫𝔤 𝔴𝔦𝔱𝔥 {channel.receiver.fullName}
            </Typography>

            <Image
              src="/svg-icons/naruto3.svg"
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

            <Typography
              variant="h6"
              fontWeight="50"
              mt={5}
              textAlign="center"
              justifyContent="center"
            >
              𝔖𝔱𝔞𝔯𝔱 𝔦𝔫𝔱𝔢𝔯𝔞𝔠𝔱𝔦𝔫𝔤 𝔴𝔦𝔱𝔥 @{channel.receiver.username} 𝔦𝔫 𝔦𝔫𝔰𝔱𝔞𝔤𝔯𝔞𝔪
            </Typography>
          </Stack>
        )}

        {messages && <MessageInput onMessage={() => loadChannelMessages()} />}
      </Container>
    </>
  );
}
