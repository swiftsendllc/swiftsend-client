import useMessageAPI from "@/hooks/api/useMessageAPI";
import {
  EditMessageInput,
  MessagesEntity,
  UserProfilesEntity,
} from "@/hooks/types";
import EditIcon from "@mui/icons-material/Edit";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Drawer,
  FormControl,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";

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
export default function InfoMessageDrawer({
  isOpen,
  onClose,
  message,
  setChannelMessages,
}: {
  isOpen: boolean;
  onClose?: () => unknown;
  message: MessagesEntity;
  setChannelMessages: React.Dispatch<React.SetStateAction<ChannelData[]>>;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setDrawerOpen(isOpen), [isOpen]);

  const handleDrawerClose = () => {
    onClose?.();
    setOpen(false);
  };

  const { deleteMessage, editMessage } = useMessageAPI();
  const [editedMessage, setEditedMessage] = useState<Partial<EditMessageInput>>(
    {
      message: message.message,
    }
  );
  const handleDelete = async () => {
    try {
      await deleteMessage(message._id);
      setChannelMessages((previous) =>
        previous.filter((msg) => msg._id !== message._id)
      );
      onClose?.();
      toast.success("Deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete message!");
    }
  };

  const handleEdit = async () => {
    try {
      if (!editedMessage.message) return;
      await editMessage(message._id, editedMessage);
      setChannelMessages((pre) =>
        pre.map((msg) =>
          msg._id === message._id ? { ...msg, ...editedMessage } : msg
        )
      );
      toast.success("Edited");
      setEditDialogOpen(false)
    } catch (error) {
      console.log(error);
      toast.error("Failed to edit message!");
    }
  };

  const messageDrawer = [
    {
      label: "Delete",
      icon: <LayersClearIcon />,
      action: handleDelete,
    },
    {
      label: "Edit",
      icon: <EditIcon />,
      action: () => setEditDialogOpen(true),
    },
    {
      label: "Forward",
      icon: <LayersClearIcon />,
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
          onClose={handleDrawerClose}
        >
          <List>
            {messageDrawer.map((option, idx) => (
              <Fragment key={idx}>
                <ListItem disablePadding>
                  <ListItemButton onClick={option.action}>
                    <ListItemIcon>{option.icon}</ListItemIcon>
                    <ListItemText primary={option.label} />
                  </ListItemButton>
                </ListItem>
              </Fragment>
            ))}
          </List>
        </Drawer>
      </Box>
      <Dialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          PaperProps={{
            component: "form",
          }}
        >

            <DialogContent>
              <TextField
                autoFocus
                label="Edit message"
                type="message"
                fullWidth
                variant="standard"
                value={editedMessage.message || " "}
                onChange={(e) => setEditedMessage({ message: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
              <Button
                type="submit"
                disabled={!editedMessage.message}
                onClick={handleEdit}
              >
                Save
              </Button>
            </DialogActions>
        </Dialog>
    </>
  );
}
