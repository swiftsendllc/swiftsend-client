import useMessageAPI from "@/hooks/api/useMessageAPI";
import { ChannelContext } from "@/hooks/context/channel-context";
import { SocketContext } from "@/hooks/context/socket-context";
import {
  ChannelsEntity,
  DeleteMessageInput,
  EditMessageInput,
  MessagesEntity,
  MessageUserInput,
} from "@/hooks/entities/messages.entities";

import { FiberManualRecord } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  FormControl,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function InfoMessageDrawer({
  isOpen,
  onClose,
  message,
  setChannelMessages,
}: {
  isOpen: boolean;
  onClose?: () => unknown;
  message: MessagesEntity;
  setChannelMessages: React.Dispatch<React.SetStateAction<MessagesEntity[]>>;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [channelDialogOpen, setChannelDialogOpen] = useState(false);
  const [, setOpen] = useState(isOpen);
  useEffect(() => setDrawerOpen(isOpen), [isOpen]);
  const { socket } = useContext(SocketContext);
  const [channel] = useContext(ChannelContext);
  const [forwardedMessage] = useState<Partial<MessageUserInput>>({
    message: message.message,
  });
  const { deleteMessage, editMessage, getChannels, forwardMessage } =
    useMessageAPI();
  const [channels, setChannels] = useState<ChannelsEntity[]>([]);
  const [editedMessage, setEditedMessage] = useState<Partial<EditMessageInput>>(
    {
      message: message.message,
    }
  );

  const [isDeleted] = useState<Partial<DeleteMessageInput>>({
    deleted: message.deleted,
  });

  const handleClose = () => {
    onClose?.();
    setOpen(false);
  };

  const loadChannels = async () => {
    try {
      const channels = await getChannels();
      setChannels(channels);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load channels!");
    }
  };

  useEffect(() => {
    loadChannels();
  }, []); //eslint-disable-line

  const handleDelete = async (deleted: boolean) => {
    try {
      await deleteMessage(message._id, isDeleted, deleted);
      if (deleted) {
        setChannelMessages((pre) =>
          pre.map((msg) =>
            msg._id === message._id ? { ...msg, deleted: true } : msg
          )
        );
      } else {
        setChannelMessages((previous) =>
          previous.filter((msg) => msg._id !== message._id)
        );
      }

      onClose?.();
      toast.success(deleted ? "Deleted for everyone" : "Deleted for you");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete message!");
    }
  };

  const handleEdit = async () => {
    try {
      if (!editedMessage.message) return;
      const updatedMessage = await editMessage(message._id, editedMessage);
      setChannelMessages((pre) =>
        pre.map((msg) =>
          msg._id === message._id ? { ...msg, ...editedMessage } : msg
        )
      );
      socket?.emit("messageEdited", updatedMessage);
      toast.success("Edited");
      setEditDialogOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to edit message!");
    }
  };

  const getEditedSocketMessages = () => {
    if (socket) {
      console.log("Socket connected", socket?.id);
      socket.on("messageEdited", (editedMessage: EditMessageInput) => {
        console.log("Message edited:", editedMessage);
        setChannelMessages((pre) =>
          pre.map((msg) =>
            msg._id === message._id ? { ...msg, ...editedMessage } : msg
          )
        );
      });
    }
    return () => {
      if (socket) {
        console.log("Socket disconnected:", socket?.id);
        socket.off("messageEdited");
      }
    };
  };

  const handleForward = async (receiverId: string) => {
    try {
      if (!forwardedMessage.message) return;
      const forwarded = await forwardMessage(
        message._id,
        forwardedMessage,
        receiverId
      );
      setChannelMessages((prev) => [...prev, forwarded]);
      setChannelDialogOpen(false);
      toast.success("Forwarded");
    } catch (error) {
      console.log(error);
      toast.error("Failed to load message!");
    }
  };

  useEffect(() => {
    const cleanUp = getEditedSocketMessages();
    return () => {
      cleanUp();
    };
  }, [socket]); //eslint-disable-line

  const messageInfoOptions = [
    {
      label: "Delete for you",
      icon: <DeleteOutlineIcon sx={{ color: "var(--error)" }} />,
      action: () => handleDelete(false),
    },
    {
      label: "Delete for everyone",
      icon: <DeleteSweepOutlinedIcon sx={{ color: "var(--error)" }} />,
      action: () => handleDelete(true),
    },
    {
      label: "Edit",
      icon: <EditIcon sx={{ color: "var(--warning)" }} />,
      action: () => setEditDialogOpen(true),
    },
    {
      label: "Forward",
      icon: <ShortcutIcon sx={{ color: "var(--success)" }} />,
      action: () => setChannelDialogOpen(true),
    },
  ];

  return (
    <>
      <Box role="presentation" sx={{ width: "auto" }}>
        <Drawer
          open={drawerOpen}
          keepMounted
          anchor="bottom"
          sx={{
            maxWidth: "xs",
          }}
          onClose={handleClose}
        >
          <List>
            {messageInfoOptions.map((option, idx) => {
              const initial = new Date(message.createdAt).getTime();
              const current = new Date().getTime();
              const isDisabled = current - initial >= 2 * 60 * 1000;

              return (
                <Fragment key={idx}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={option.action}
                      disabled={isDisabled && option.label === "Edit"}
                    >
                      <ListItemIcon>{option.icon}</ListItemIcon>
                      <ListItemText primary={option.label} />
                    </ListItemButton>
                  </ListItem>
                </Fragment>
              );
            })}
          </List>
        </Drawer>
      </Box>
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        PaperProps={{
          style: {
            margin: "0",
            width: "100%",
          },
        }}
      >
        <FormControl
          component="form"
          variant="standard"
          fullWidth
          sx={{
            margin: 0,
            padding: 0,
          }}
        >
          <DialogContent>
            <TextField
              focused
              autoFocus
              label="Edit message"
              type="message"
              fullWidth
              value={editedMessage.message || " "}
              onChange={(e) => setEditedMessage({ message: e.target.value })}
            />
          </DialogContent>
          <DialogActions
            sx={{
              padding: 0,
              margin: 0,
              paddingLeft: 0,
              justifyContent: "flex",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={() => setEditDialogOpen(false)}
              >
                <CloseIcon /> Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                disabled={!editedMessage.message}
                onClick={() => {
                  handleEdit();
                  handleClose()
                }}
              >
                <DoneOutlineIcon /> Save
              </Button>
            </Stack>
          </DialogActions>
        </FormControl>
      </Dialog>
      <Dialog
        open={channelDialogOpen}
        keepMounted
        fullWidth
        onClose={() => setChannelDialogOpen(false)}
      >
        <DialogTitle fontWeight={200}>Forward this message to: </DialogTitle>
        {channels
          .filter(
            (channelUser) =>
              channelUser.receiver.userId !== channel.receiver.userId
          )
          .map((channelUser, idx) => (
            <Card key={idx} sx={{ width: "100%", p: 0 }}>
              <CardHeader
                avatar={
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <FiberManualRecord
                        sx={{
                          color: "#80EF80",
                          border: "80EF80",
                          fontSize: "15px",
                        }}
                      />
                    }
                  >
                    <Avatar
                      src={channelUser.receiver.avatarURL}
                      alt={channelUser.receiver.username}
                    />
                  </Badge>
                }
                action={
                  <Button
                    variant="contained"
                    onClick={() => handleForward(channelUser.receiver.userId)}
                  >
                    Send
                    <SendIcon sx={{ width: 15, height: 15, ml: 1 }} />
                  </Button>
                }
                title={channelUser.receiver.fullName}
              />
            </Card>
          ))}
      </Dialog>
    </>
  );
}
