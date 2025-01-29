"use client";

import MessageInput from "@/components/MessageInput";
import { StyledBadge } from "@/components/SearchComponents";
import useMessageAPI from "@/hooks/api/useMessageAPI";
import { ChannelContext } from "@/hooks/context/channel-context";
import { useSocket } from "@/hooks/context/socket-context";
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
  CircularProgress,
  Container,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import InfoChannelDrawer from "./components/InfoChannelDrawer";
import InfoMessageDrawer from "./components/InfoMessageDrawer";

export default function MessagePage() {
  const router = useRouter();
  const { socket } = useSocket();
  const { channelId } = useParams();
  const [user] = useContext(UserContext);
  const [channel] = useContext(ChannelContext);
  const { getChannelMessages } = useMessageAPI();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<MessagesEntity[]>([]);
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
      toast.error("Failed to load messages!");
    }
  };

  useEffect(() => {
    console.log("Socket connected:", socket.id);
    socket.on("newMessage", (newMessage: MessagesEntity) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    socket.on(
      "messageEdited",
      (editedMessage: {
        messageId: string;
        message: string;
        editedAt: Date;
        edited: boolean;
      }) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === editedMessage.messageId
              ? {
                  ...msg,
                  message: editedMessage.message,
                  editedAt: editedMessage.editedAt,
                  edited: true,
                }
              : msg
          )
        );
      }
    );

    socket.on(
      "messageDeleted",
      (message: {
        messageId: string;
        deleted: boolean;
        deletedAt: Date;
        message: string;
      }) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === message.messageId
              ? {
                  ...msg,
                  messageId: message.messageId,
                  deletedAt: message.deletedAt,
                  deleted: true,
                  message: "",
                }
              : msg
          )
        );
      }
    );

    socket.on("connect_err", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      console.log("Socket disconnected:", socket.id);
      socket.off("newMessage");
      socket.off("messageEdited");
      socket.off("messageDeleted");
      socket.off("connect_err");
    };
  }, [setMessages]); //eslint-disable-line

  useEffect(() => {
    if (channelId) loadChannelMessages();
  }, [channelId]); // eslint-disable-line

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
                    {channel.receiver.isOnline ? (
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
                      <Avatar
                        aria-label="recipe"
                        src={channel.receiver.avatarURL}
                        alt={channel.receiver.fullName}
                      />
                    )}
                  </>
                }
                title={channel.receiver.fullName}
                subheader={
                  channel.receiver.isOnline ? (
                    <Typography variant="body2">ONLINE</Typography>
                  ) : new Date().getTime() -
                      new Date(channel.receiver.lastSeen).getTime() >=
                    24 * 60 * 60 * 1000 ? (
                    ` Seen ${moment(channel.receiver.lastSeen).format(
                      "LTL"
                    )}`
                  ) : (
                    `last seen at ${moment(
                      channel.receiver.lastSeen
                    ).fromNow()}`
                  )
                }
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
                        !isUser && !message.deleted ? (
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
                          {message.deleted
                            ? "This message was deleted"
                            : message.message || "unknown message"}{" "}
                        </Typography>
                      }
                      subheader={
                        <Typography variant="caption" fontSize=".55rem">
                          {message.deleted
                            ? ` ${moment(message.deletedAt).fromNow()} deleted`
                            : message.edited
                            ? `${moment(message.editedAt).fromNow()} edited`
                            : `${moment(message.createdAt).fromNow()}`}
                        </Typography>
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
            <CircularProgress />

            <Typography variant="h6" fontWeight="50" my={3} color="primary">
              You are connecting with {channel.receiver.fullName}
            </Typography>
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              <LinearProgress color="success" />
            </Stack>
            <Typography variant="h6" fontWeight="50" my={3} color="primary">
              hello 👋
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
            setMessages={setMessages}
          />
        )}

        {messages && <MessageInput onMessage={() => loadChannelMessages()} />}
      </Container>
    </>
  );
}
