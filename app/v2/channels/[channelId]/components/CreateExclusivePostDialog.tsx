import useMessageAPI from '@/hooks/api/useMessageAPI';
import { ChannelContext } from '@/hooks/context/channel-context';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface ExclusivePostProps {
  selectedAssetIds: string[];
  selectedAssetUrls: string[];
  isOpen: boolean;
  onClose?: () => unknown;
  onSend: (msg: MessagesEntity) => unknown;
}

export function CreateExclusivePostDialog({
  isOpen,
  onClose,
  selectedAssetIds,
  onSend,
  selectedAssetUrls
}: ExclusivePostProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const { sendMessage } = useMessageAPI();
  const [channel] = useContext(ChannelContext);
  const [isExclusive, setIsExclusive] = useState<boolean>(true);
  const [price, setPrice] = useState<number>(500);
  const [msg, setMsg] = useState<string>('Do you like it?🍑');

  const handleSendExclusiveMessage = async () => {
    setLoading(true);
    try {
      const exclusivePost = await sendMessage({
        message: msg,
        receiverId: channel.receiver.userId,
        isExclusive: isExclusive,
        price: price,
        assetIds: selectedAssetIds
      });
      onSend(exclusivePost);
    } catch (error) {
      console.error(error);
      toast.error('Oops! Something wrong happened!');
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleClose = () => {
    onClose?.();
    setPrice(0);
    setMsg('');
    setIsExclusive(false);
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
      <DialogTitle>
        <Typography variant="h6">Create Exclusive Post</Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={3} mt={1}>
          <FormControlLabel
            control={<Switch checked={isExclusive} onChange={(e) => setIsExclusive(e.target.checked)} />}
            label="Exclusive Post"
          />

          {isExclusive && (
            <TextField
              id="price"
              name="price"
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  )
                }
              }}
            />
          )}

          <TextField
            id="message"
            name="message"
            label="Write your message..."
            multiline
            rows={4}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            fullWidth
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small">
                      <InsertEmoticonIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
          />

          <Box>
            <Stack direction="row" spacing={1} mt={1} overflow="auto">
              {selectedAssetUrls.map((url, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    position: 'relative',
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 2
                  }}
                >
                  <Box
                    component={'img'}
                    src={url}
                    alt={`sent`}
                    sx={{
                      width: 80,
                      height: 80,
                      objectFit: 'cover',
                      borderRadius: 2
                    }}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 2,
                      right: 2,
                      background: 'rgba(0,0,0,0.4)',
                      color: 'white',
                      p: '2px'
                    }}
                    size="small"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <LoadingButton loading={loading} variant="contained" color="primary" onClick={handleSendExclusiveMessage}>
          Send Post
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
