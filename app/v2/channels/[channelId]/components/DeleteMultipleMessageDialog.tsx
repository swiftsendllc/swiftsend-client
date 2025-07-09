import useMessageAPI from '@/hooks/api/useMessageAPI';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import { DeleteForeverOutlined } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface DeleteMultipleMessageDialogProps {
  isOpen: boolean;
  onClose?: () => unknown;
  selectedMultiple: MessagesEntity[];
  onToggleSelect: (msg: MessagesEntity) => unknown;
  onDeleteMultiple: (msgs: MessagesEntity[]) => unknown;
  setMultipleSelectCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMultiple: React.Dispatch<React.SetStateAction<MessagesEntity[]>>;
}
export function DeleteMultipleMessageDialog({
  isOpen,
  onClose,
  onToggleSelect,
  onDeleteMultiple,
  selectedMultiple,
  setSelectedMultiple,
  setMultipleSelectCheckBox
}: DeleteMultipleMessageDialogProps) {
  const [open, setOpen] = useState<boolean>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const { deleteMessages } = useMessageAPI();

  const handleDeleteMultipleMessages = async () => {
    const messageIds = selectedMultiple.map((m) => m._id);
    try {
      const updatedMessages = await deleteMessages(messageIds);
      onDeleteMultiple(updatedMessages);
      toast.success('Deleted selected messages');
    } catch (error) {
      console.error(error);
      toast.error('Oops! Something wrong happened!');
    } finally {
      handleClose();
    }
  };

  const handleClose = () => {
    onClose?.();
    setSelectedMultiple([]);
    setMultipleSelectCheckBox(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { borderRadius: 3, p: 2 }
      }}
    >
      <DialogTitle display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
        <Typography>Are you sure you want to delete this messages?</Typography>
        <Typography>Total {selectedMultiple.length}</Typography>
      </DialogTitle>
      <DialogContent
        sx={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', maxHeight: 300, scrollBehavior: 'smooth' }}
      >
        {selectedMultiple.map((message, idx) => {
          return (
            <Box
              key={idx}
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'space-between'}
              sx={{ borderRadius: 4, border: '1px solid', minHeight: 72, mb: 1, scrollBehavior: 'smooth' }}
            >
              <Box flexDirection={'column'} justifyContent={'space-between'}>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} m={1} gap={10}>
                  <Typography>{message.message}</Typography>
                  {message.isExclusive && <Typography fontStyle={'italic'}>Exclusive post</Typography>}
                  <Typography>{moment(message.createdAt).format('hh:mm')}</Typography>
                </Box>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} m={1}>
                  {message.isPurchased && <Typography>Purchased</Typography>}
                  {message.edited && <Typography fontStyle={'italic'}>edited</Typography>}
                  <Typography>{moment(message.createdAt).format('L')}</Typography>
                </Box>
              </Box>
              <Box>
                <IconButton onClick={() => onToggleSelect(message)}>
                  <DeleteForeverOutlined />
                </IconButton>
              </Box>
            </Box>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleClose}>
          CANCEL
        </Button>
        <Button variant="contained" color="info" onClick={handleDeleteMultipleMessages}>
          DELETE
        </Button>
      </DialogActions>
    </Dialog>
  );
}
