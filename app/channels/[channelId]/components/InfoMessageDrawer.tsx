'use client';

import useMessageAPI from '@/hooks/api/useMessageAPI';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import EditIcon from '@mui/icons-material/Edit';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function InfoMessageDrawer({
  isOpen,
  onClose,
  message,
  setMessages
}: {
  isOpen: boolean;
  onClose?: () => unknown;
  message: MessagesEntity;
  setMessages: React.Dispatch<React.SetStateAction<MessagesEntity[]>>;
}) {
  const [open, setOpen] = useState<boolean>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const [didChange, setDidChange] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { deleteMessage, editMessage } = useMessageAPI();
  const [editedMessage, setEditedMessage] = useState(message.message);

  const handleClose = () => {
    onClose?.();
    setOpen(false);
    setEditDialogOpen(false);
  };

  useEffect(() => {
    setDidChange(editedMessage !== message.message);
  }, [editedMessage, message]);

  const handleDelete = async () => {
    try {
      await deleteMessage(message._id);
      setMessages((pre) =>
        pre.map((msg) =>
          msg._id === message._id
            ? { ...msg, deleted: true, deletedAt: new Date() }
            : msg
        )
      );
      handleClose();
      toast.success('DELETED');
    } catch (error) {
      console.log(error);
      toast.error('FAILED TO DELETE MESSAGE!');
    }
  };

  const handleEdit = async () => {
    try {
      await editMessage(message._id, { message: editedMessage });
      setMessages((pre) =>
        pre.map((msg) =>
          msg._id === message._id
            ? {
                ...msg,
                message: editedMessage,
                edited: true,
                editedAt: new Date()
              }
            : msg
        )
      );
      handleClose();
      toast.success('EDITED');
    } catch (error) {
      console.log(error);
      toast.error('FAILED TO EDIT MESSAGE!');
    }
  };

  const options = [
    {
      label: 'Delete',
      icon: <DeleteSweepOutlinedIcon sx={{ color: 'var(--error)' }} />,
      action: () => handleDelete()
    },
    {
      label: 'Edit',
      icon: <EditIcon sx={{ color: 'var(--warning)' }} />,
      action: () => setEditDialogOpen(true)
    },
    {
      label: 'Forward',
      icon: <ShortcutIcon sx={{ color: 'var(--success)' }} />
    }
  ];

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        keepMounted
        maxWidth="xs"
        PaperProps={{
          style: {
            margin: 0,
            width: '100%'
          }
        }}
      >
        <List sx={{ width: '100%', padding: 0 }}>
          {options.map((option, idx) => (
            <>
              <Paper elevation={3}>
                <ListItemButton
                  key={idx}
                  sx={{ p: 0, py: 1, borderRadius: 2, mb: 0.5 }}
                  onClick={option.action}
                >
                  <ListItemText disableTypography>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignContent="center"
                      alignItems="center"
                    >
                      <Typography variant="body1">{option.label}</Typography>
                    </Stack>
                  </ListItemText>
                </ListItemButton>
              </Paper>
            </>
          ))}
        </List>
      </Dialog>
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        keepMounted
        fullWidth
        maxWidth="xs"
        PaperProps={{
          style: {
            margin: 0,
            width: '100%'
          }
        }}
        aria-describedby="edit-dialog-open"
      >
        <FormControl
          variant="standard"
          fullWidth
          component="form"
          sx={{ margin: 0, padding: 0 }}
        >
          <DialogTitle sx={{ pb: 0 }}>Edit your message</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Don&apos;t worry, edit your message, if anything is wrong
            </DialogContentText>
            <Stack>
              <TextField
                id="edit-message-field"
                value={editedMessage}
                type="text"
                placeholder="Edit your message"
                variant="standard"
                onChange={(event) => {
                  setEditedMessage(event.target.value);
                }}
                slotProps={{
                  input: {
                    startAdornment: <EditIcon />
                  }
                }}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>CANCEL</Button>
            <Button onClick={handleEdit} disabled={!didChange}>
              CONFIRM
            </Button>
          </DialogActions>
        </FormControl>
      </Dialog>
    </>
  );
}
