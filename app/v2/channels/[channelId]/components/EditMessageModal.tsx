import useMessageAPI from '@/hooks/api/useMessageAPI';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import ChatIcon from '@mui/icons-material/Chat';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface ModalProps {
  isOpen: boolean;
  message: MessagesEntity;
  onUpdateMessage: (msg: MessagesEntity) => unknown;
  onClose?: () => unknown;
}

export function EditMessageModal({ message, isOpen, onClose, onUpdateMessage }: ModalProps) {
  const [open, setOpen] = useState<boolean>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const { editMessage } = useMessageAPI();
  const [updatedMessage, setUpdatedMessage] = useState<string>(message.message);

  const handleUpdateMessage = async () => {
    try {
      const updatedResponse = await editMessage(message._id, { message: updatedMessage });
      onUpdateMessage(updatedResponse);
      
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error('Oops!Something wrong happened!');
    }
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle>Edit Message</DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            id="edit-message"
            name="edit-message"
            type="text"
            fullWidth
            variant="outlined"
            value={updatedMessage}
            onChange={(event) => setUpdatedMessage(event.target.value)}
            slotProps={{
              input: {
                startAdornment: <ChatIcon color="disabled" />,
                endAdornment: <EditIcon color="disabled" />
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ borderTop: '1px solid', justifyContent: 'space-between' }}>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: 'ActiveBorder' }} />
          <Button
            variant="contained"
            color="primary"
            disabled={message.message === updatedMessage.trim()}
            onClick={handleUpdateMessage}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
