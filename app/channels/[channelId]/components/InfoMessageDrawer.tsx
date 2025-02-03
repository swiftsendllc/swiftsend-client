"use client"

import useMessageAPI from "@/hooks/api/useMessageAPI";
import { ChannelContext } from "@/hooks/context/channel-context";
import {
  ChannelsEntity,
  EditMessageInput,
  MessagesEntity,
  MessageUserInput,
} from "@/hooks/entities/messages.entities";

import { FiberManualRecord } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
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
  selectedMessage,
  setMessages,
}: {
  isOpen: boolean;
  onClose?: () => unknown;
  selectedMessage: MessagesEntity;
  setMessages: React.Dispatch<React.SetStateAction<MessagesEntity[]>>;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [channelDialogOpen, setChannelDialogOpen] = useState(false);
  const [, setOpen] = useState(isOpen);
  useEffect(() => setDrawerOpen(isOpen), [isOpen]);
  const [channel] = useContext(ChannelContext);
  const [forwardedMessage] = useState<Partial<MessageUserInput>>({
    message: selectedMessage.message,
  });
  const { deleteMessage, editMessage, forwardMessage } = useMessageAPI();
  const [channels] = useState<ChannelsEntity[]>([]);
  const [editedMessage, setEditedMessage] = useState<Partial<EditMessageInput>>(
    {
      message: selectedMessage.message,
    }
  );
  useEffect(() => {
    setEditedMessage({ message: selectedMessage.message });
  }, [selectedMessage]);

  const handleClose = () => {
    onClose?.();
    setOpen(false);
  };

  const handleDelete = async (deleted: boolean) => {
    try {
      await deleteMessage(selectedMessage._id, deleted);
      if (deleted) {
        setMessages((pre) =>
          pre.map((msg) =>
            msg._id === selectedMessage._id ? { ...msg, deleted: true } : msg
          )
        );
      }
      onClose?.();
      toast.success("Deleted for everyone");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete message!");
    }
  };

  const handleEdit = async () => {
    try {
      if (!editedMessage.message) return;
      await editMessage(selectedMessage._id, editedMessage);
      setMessages((pre) =>
        pre.map((msg) =>
          msg._id === selectedMessage._id ? { ...msg, ...editedMessage } : msg
        )
      );

      toast.success("Edited");
      setEditDialogOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to edit message!");
    }
  };

  const handleForward = async (receiverId: string) => {
    try {
      if (!forwardedMessage.message) return;
      const forwarded = await forwardMessage(
        selectedMessage._id,
        forwardedMessage,
        receiverId
      );
      setMessages((prev) => [...prev, forwarded]);
      setChannelDialogOpen(false);
      toast.success("Forwarded");
    } catch (error) {
      console.log(error);
      toast.error("Failed to load message!");
    }
  };

  const messageInfoOptions = [
    {
      label: "Delete",
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
              const initial = new Date(selectedMessage.createdAt).getTime();
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
                  handleClose();
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
