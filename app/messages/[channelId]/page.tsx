"use client";

import MessageInput from "@/components/MessageInput";
import useMessageAPI from "@/hooks/api/useMessageAPI";
import { ChannelContext } from "@/hooks/context/channel-context";
import { UserContext } from "@/hooks/context/user-context";
import { MessagesEntity, UserProfilesEntity } from "@/hooks/types";
import { FiberManualRecord } from "@mui/icons-material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import EditIcon from "@mui/icons-material/Edit";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import {
  Avatar,
  Badge,
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
import toast from "react-hot-toast";
import InfoChannelDrawer from "./InfoChannelDrawer";
import InfoMessageDrawer from "./InfoMessageDrawer";

interface ChannelData {
  _id: string;
  senderId: string;
  receiverId: string;
  channelId: string;
  message: string;
  imageURL: string | null;
  createdAt: Date;
  deletedAt: Date;
  editedAt: Date;
  receiver: UserProfilesEntity;
  lastMessage: {
    _id: string;
    message: string;
    createdAt: string;
    deletedAt: Date;
    editedAt: Date;
  } | null;
}

export default function SingleMessage() {
  const { getChannelMessages } = useMessageAPI();
  const [messages, setMessages] = useState<ChannelData[]>([]);
  const { channelId } = useParams();
  const router = useRouter();
  const [channel] = useContext(ChannelContext);
  const [user] = useContext(UserContext);
  const [infoChannelDrawer, setInfoChannelDrawer] = useState(false);
  const [infoMessageDrawer, setInfoMessageDrawer] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<MessagesEntity | null>(
    null
  );

  const loadChannelMessages = async () => {
    try {
      const message = await getChannelMessages(channelId as string);
      setMessages(message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load posts!");
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
                      <FiberManualRecord
                        sx={{
                          color: "#80EF80",
                          fontSize: "15px",
                          border: "#80EF80",
                        }}
                      />
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
              action={
                messages.length > 0 ? (
                  <IconButton onClick={() => setInfoChannelDrawer(true)}>
                    <FilterAltOutlinedIcon />
                  </IconButton>
                ) : null
              }
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
                        !isUser ? (
                          <IconButton
                            sx={{ mt: 0 }}
                            onClick={() => {
                              setSelectedMessage(message);
                              setInfoMessageDrawer(true);
                            }}
                          >
                            <EditIcon sx={{ width: 15, height: 15 }} />
                          </IconButton>
                        ) : null
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
        <InfoChannelDrawer
          channel={channel}
          isOpen={infoChannelDrawer}
          onClose={() => setInfoChannelDrawer(false)}
        />
        {selectedMessage && (
           <InfoMessageDrawer
           isOpen={infoMessageDrawer}
           onClose={() => setInfoMessageDrawer(false)}
           message={selectedMessage}
           setChannelMessages={setMessages}
         />
        )}

        {messages && <MessageInput onMessage={() => loadChannelMessages()} />}
      </Container>
    </>
  );
}
