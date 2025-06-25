import useMessageAPI from '@/hooks/api/useMessageAPI';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import { Button, Dialog, DialogActions, DialogTitle, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => unknown;
  message: MessagesEntity;
  onDeleteMessage: (msg: MessagesEntity) => unknown;
}
export function DeleteMessageModal({ isOpen, onClose, message, onDeleteMessage }: ModalProps) {
  const [open, setOpen] = useState<boolean>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const { deleteMessage } = useMessageAPI();

  const handleDeleteMessage = async () => {
    try {
      const deletedResponse = await deleteMessage(message._id);
      onDeleteMessage(deletedResponse);
      toast.success('You deleted this message');
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error('Oops! Something wrong happened!');
    }
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>Delete Message</DialogTitle>
      <Divider />
      <DialogActions sx={{ borderTop: '1px solid', justifyContent: 'space-between' }}>
        <Button variant="outlined" color="secondary" onClick={handleClose} fullWidth>
          Cancel
        </Button>
        <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: 'black' }} />
        <Button variant="contained" color="error" fullWidth onClick={handleDeleteMessage}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
