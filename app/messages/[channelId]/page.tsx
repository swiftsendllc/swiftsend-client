"use client";

import MessageInput from "@/components/MessageInput";
import { StyledBadge } from "@/components/SearchComponents";
import useMessageAPI from "@/hooks/api/useMessageAPI";
import { ChannelContext } from "@/hooks/context/channel-context";
import { SocketContext } from "@/hooks/context/socket-context";
import { UserContext } from "@/hooks/context/user-context";
import { MessagesEntity } from "@/hooks/entities/messages.entities";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EditIcon from "@mui/icons-material/Edit";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import InfoChannelDrawer from "./InfoChannelDrawer";
import InfoMessageDrawer from "./InfoMessageDrawer";

export default function SingleMessage() {
  const { getChannelMessages } = useMessageAPI();
  const [messages, setMessages] = useState<MessagesEntity[]>([]);
  const { channelId } = useParams();
  const router = useRouter();
  const [channel] = useContext(ChannelContext);
  const [user] = useContext(UserContext);
  const [infoChannelDrawer, setInfoChannelDrawer] = useState(false);
  const [infoMessageDrawer, setInfoMessageDrawer] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<MessagesEntity | null>(
    null
  );

  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const { socket, onlineUsers } = useContext(SocketContext);
  console.log("online users:", onlineUsers);
  const loadChannelMessages = async () => {
    try {
      const message = await getChannelMessages(channelId as string);
      setMessages(message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load posts!");
    }
  };

  const getSocketMessages = () => {
    if (socket) {
      console.log("Socket connected:", socket?.id);
      socket.on("newMessage", (newMessage: MessagesEntity) => {
        console.log("New messages received:", newMessage);
        setMessages((prev) => [...prev, newMessage]);
      });
      socket.on("messageEdited", (editedMessage: MessagesEntity) => {
        console.log("Message edited:", editedMessage)
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === editedMessage._id ? { ...msg, ...editedMessage } : msg
          )
        );
      });

      socket.on("connect_err", (error) => {
        console.error("Socket connection error:", error);
      });
    }

    return () => {
      if (socket) {
        console.log("Socket disconnected:", socket?.id);
        socket.off("newMessage");
        socket.off("messageEdited");
      }
    };
  };

  useEffect(() => {
    if (channelId) loadChannelMessages();
  }, [channelId]); // eslint-disable-line

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const cleanUp = getSocketMessages();
    return () => {
      cleanUp();
    };
  }, [socket]); //eslint-disable-line

  return (
    <>
      <Container
        maxWidth="xs"
        style={{ padding: 0, marginBottom: 60, position: "relative" }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignContent="center"
          alignItems="center"
          sx={{ position: "fixed", zIndex: 4, left: 0, right: 0 }}
        >
          <Container maxWidth="xs" style={{ padding: 0 }}>
            <Card style={{ width: "100%", padding: 0 }}>
              <CardHeader
                avatar={
                  <>
                    <IconButton onClick={() => router.back()}>
                      <ArrowBackOutlinedIcon />
                    </IconButton>
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
                          src={channel.receiver.avatarURL}
                          alt={channel.receiver.fullName}
                        />
                      </StyledBadge>
                    ) : (
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
                          src={channel.receiver.avatarURL}
                          alt={channel.receiver.fullName}
                        />
                      </StyledBadge>
                    )}
                  </>
                }
                title={channel.receiver.fullName}
                action={
                  messages.length > 0 ? (
                    <>
                      <IconButton>
                        <ContactPhoneIcon />
                      </IconButton>
                      <IconButton>
                        <VideoCameraFrontIcon />
                      </IconButton>
                      <IconButton onClick={() => setInfoChannelDrawer(true)}>
                        <FilterAltOutlinedIcon />
                      </IconButton>
                    </>
                  ) : null
                }
              />
            </Card>
          </Container>
        </Stack>
        <Divider />
        <Card sx={{ my: 2, borderRadius: "50px", marginTop: 10 }}>
          <CardContent>
            <Typography
              textAlign="center"
              alignContent="center"
              alignItems="center"
              variant="body1"
              fontWeight={200}
            >
              Messages are end to end encrypted.
              <br />
              No one outside of this chat can read or listen to them.Tap to
              learn more.
            </Typography>
          </CardContent>
        </Card>
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
                  ref={idx === messages.length - 1 ? lastMessageRef : null}
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
                        !message.deleted ? (
                          <Typography fontWeight={200}>
                            {typeof message.message ||
                            message.message === "string"
                              ? message.message
                              : ""}
                          </Typography>
                        ) : (
                          <Typography fontWeight={200}>
                            This message was deleted
                          </Typography>
                        )
                      }
                      subheader={
                        <>
                          {message.edited ? (
                            <>
                              <Typography variant="caption" fontSize=".55rem">
                                {new Date(message.editedAt).toLocaleString()}
                              </Typography>
                              <Typography variant="caption" fontSize=".55rem">
                                edited
                              </Typography>
                            </>
                          ) : (
                            <Typography variant="caption" fontSize=".55rem">
                              {new Date(message.createdAt).toLocaleString()}
                            </Typography>
                          )}
                          {message.deleted && (
                            <Typography variant="caption" fontSize=".55rem">
                              {new Date(message.deletedAt).toLocaleString()}
                            </Typography>
                          )}
                        </>
                      }
                    />
                    {message.imageURL && !message.deleted && (
                      <CardMedia
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "100%",
                          marginBottom: "20",
                        }}
                        component="img"
                        src={message.imageURL}
                        alt="Image loading"
                        width={400}
                        height={400}
                      />
                    )}
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
