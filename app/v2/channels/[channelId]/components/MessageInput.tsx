import useMessageAPI from '@/hooks/api/useMessageAPI';
import { ChannelContext } from '@/hooks/context/channel-context';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Box, IconButton, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface MessageInputProps {
  onSend: (msg: MessagesEntity) => unknown;
}

export function MessageInput({ onSend }: MessageInputProps) {
  const price = 0;
  const isExclusive = false;
  const assetIds: string[] = [];
  const { sendMessage } = useMessageAPI();
  const [channel] = useContext(ChannelContext);
  const [message, setMessage] = useState<string>('');
  const [didChange, setDidChange] = useState<boolean>(false);

  useEffect(() => {
    setDidChange(message.trim() !== '');
  }, [message]);

  const handleSendMessage = async () => {
    try {
      const messageResponse = await sendMessage({
        assetIds,
        isExclusive,
        message,
        price,
        receiverId: channel.receiver.userId
      });
      onSend(messageResponse);
      setMessage('');
    } catch (error) {
      console.error(error);
      toast.error('Oops! Something wrong happened!');
    }
  };

  return (
    <Box p={2} borderTop="1px solid ">
      <TextField
        id="message_input"
        name="message_input"
        placeholder=" Type a message..."
        fullWidth
        multiline
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxRows={3}
        variant="outlined"
        sx={{ borderRadius: 2 }}
        slotProps={{
          input: {
            startAdornment: (
              <IconButton sx={{ p: 0, m: 0, mr: 2 }}>
                <EmojiEmotionsOutlinedIcon />
              </IconButton>
            ),
            endAdornment: (
              <IconButton sx={{ p: 0, m: 0, mr: 2 }} onClick={handleSendMessage} disabled={!didChange}>
                <SendOutlinedIcon />
              </IconButton>
            )
          }
        }}
      />
    </Box>
  );
}
