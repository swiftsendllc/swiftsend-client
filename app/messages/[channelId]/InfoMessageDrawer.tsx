import useMessageAPI from "@/hooks/api/useMessageAPI";
import { EditMessageInput, MessagesEntity } from "@/hooks/types";
import CloseIcon from "@mui/icons-material/Close";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
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
  Stack,
  TextField,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
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
  const [, setOpen] = useState(isOpen);
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
      const updatedMessage = await editMessage(message._id, editedMessage);
      setChannelMessages((pre) =>
        pre.map((msg) =>
          msg._id === message._id ? { ...msg, ...updatedMessage } : msg
        )
      );
      toast.success("Edited");
      setEditDialogOpen(false);
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
                type="submit"
                disabled={!editedMessage.message}
                onClick={handleEdit}
              >
                <DoneOutlineIcon /> Save
              </Button>
            </Stack>
          </DialogActions>
        </FormControl>
      </Dialog>
    </>
  );
}
