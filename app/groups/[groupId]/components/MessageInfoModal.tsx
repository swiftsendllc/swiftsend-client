'use client';

import useMessageAPI from '@/hooks/api/useMessageAPI';
import { GroupMessagesEntity } from '@/hooks/entities/messages.entities';
import {
  DeleteForeverOutlined,
  EditLocationAlt,
  Forward10Outlined,
  ReportOffRounded
} from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function MessageInfoModal({
  isOpen,
  onClose,
  message,
  onDelete,
  onEdit
}: {
  onEdit: (edited_message: string) => unknown;
  onDelete: () => unknown;
  message: GroupMessagesEntity;
  isOpen: boolean;
  onClose?: () => unknown;
}) {
  const [open, setOpen] = useState<boolean>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const { deleteGroupMessage, editGroupMessage } = useMessageAPI();
  const [editMessageModal, setEditMessageModal] = useState<boolean>(false);
  const [didChange, setDidChange] = useState<boolean>(false);
  const [editedMessage, setEditedMessage] = useState(message.message);

  useEffect(() => {
    setDidChange(editedMessage !== message.message);
  }, [editedMessage, message]);

  const handleDeleteMessage = async () => {
    try {
      await deleteGroupMessage(message._id);
      onDelete();
      toast.success('DELETED');
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error('FAILED TO DELETE MESSAGE!');
    }
  };

  const handleEditMessage = async () => {
    try {
      await editGroupMessage(message._id, { message: editedMessage });
      onEdit(editedMessage);
      toast.success('EDITED');
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error('FAILED TO EDIT MESSAGE!');
    }
  };

  const handleClose = () => {
    setOpen(false);
    onClose?.();
    setEditMessageModal(false);
  };

  const options = [
    {
      label: 'Delete',
      leftIcon: <DeleteForeverOutlined />,
      rightIcon: <KeyboardArrowRightIcon />,
      action: () => handleDeleteMessage()
    },
    {
      label: 'Edit',
      leftIcon: <EditLocationAlt />,
      rightIcon: <KeyboardArrowRightIcon />,
      action: () => setEditMessageModal(true)
    },
    {
      label: 'Report',
      leftIcon: <ReportOffRounded />,
      rightIcon: <KeyboardArrowRightIcon />,
      action: () => undefined
    },
    {
      label: 'Forward',
      leftIcon: <Forward10Outlined />,
      rightIcon: <KeyboardArrowRightIcon />,
      action: () => undefined
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
                  <ListItemIcon sx={{ pr: 1 }}>{option.leftIcon}</ListItemIcon>
                  <ListItemText disableTypography>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignContent="center"
                      alignItems="center"
                    >
                      <Typography variant="body1">{option.label}</Typography>
                      <Icon>{option.rightIcon}</Icon>
                    </Stack>
                  </ListItemText>
                </ListItemButton>
              </Paper>
            </>
          ))}
        </List>
      </Dialog>
      <Dialog
        open={editMessageModal}
        onClose={() => setEditMessageModal(false)}
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
            <Button onClick={handleEditMessage} disabled={!didChange}>
              CONFIRM
            </Button>
          </DialogActions>
        </FormControl>
      </Dialog>
    </>
  );
}
