import useMessageAPI from '@/hooks/api/useMessageAPI';
import { ChannelContext } from '@/hooks/context/channel-context';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Box, IconButton, Skeleton, Stack, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface MessageInputProps {
  loading: boolean;
  reply: MessagesEntity | null;
  onSend: (msg: MessagesEntity) => unknown;
  setReply: React.Dispatch<React.SetStateAction<MessagesEntity | null>>;
}

export function MessageInput({ onSend, reply, setReply, loading }: MessageInputProps) {
  const price = 0;
  const isExclusive = false;
  const assetIds: string[] = [];
  const { sendMessage, sendMessageReply } = useMessageAPI();
  const [channel] = useContext(ChannelContext);
  const [message, setMessage] = useState<string>('');
  const [didChange, setDidChange] = useState<boolean>(false);

  useEffect(() => {
    setDidChange(message.trim() !== '');
  }, [message]);

  const handleSendMessage = async () => {
    try {
      let messageResponse: MessagesEntity;
      if (reply) {
        messageResponse = await sendMessageReply({
          message: message,
          messageId: reply._id,
          receiverId: channel.receiver.userId
        });
        setReply(null);
      } else {
        messageResponse = await sendMessage({
          assetIds,
          isExclusive,
          message,
          price,
          receiverId: channel.receiver.userId
        });
      }
      onSend(messageResponse);
      setMessage('');
    } catch (error) {
      console.error(error);
      toast.error('Oops! Something wrong happened!');
    }
  };

  const handleSend = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (message.trim() !== '') handleSendMessage();
    }
  };

  const formatReplyMessage = (text: MessagesEntity) => {
    if (!text.message && text.isExclusive) return '$$ Exclusive post $';
    else return text.message;
  };

  return (
    <Box p={2} borderTop="1px solid " display={'flex'} flexDirection={'column'}>
      {reply && (
        <Stack
          minWidth={'100%'}
          height={50}
          p={0}
          m={0}
          direction={'row'}
          justifyContent={'space-between'}
          border={'1px solid  #80996d'}
        >
          <Stack direction={'column'}>
            <Typography variant="body2" fontStyle={'italic'}>
              Replying to:
            </Typography>
            <Typography variant="body2" fontStyle={'italic'} ml={5}>
              {formatReplyMessage(reply)}
            </Typography>
          </Stack>

          <IconButton onClick={() => setReply(null)}>
            <CloseIcon />
          </IconButton>
        </Stack>
      )}
      <Box>
        {loading ? (
          <Stack spacing={1}>
            <Skeleton variant="text" sx={{ fontSize: '2rem', mb: 2 }} />
          </Stack>
        ) : (
          <TextField
            id="message_input"
            name="message_input"
            placeholder={reply ? `Replying` : 'Type a message...'}
            fullWidth
            multiline
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => handleSend(e)}
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
        )}
      </Box>
    </Box>
  );
}
