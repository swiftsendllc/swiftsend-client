'use client';

import useMessageAPI from '@/hooks/api/useMessageAPI';
import usePostAPI from '@/hooks/api/usePostAPI';
import { ChannelContext } from '@/hooks/context/channel-context';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LandscapeIcon from '@mui/icons-material/Landscape';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import ReplyThread from './ReplyThread';

interface UserMessageInputProps {
  onMessage: (msg: MessagesEntity) => unknown;
  replyMessage: MessagesEntity | null;
  isReplying: boolean;
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MessageInput({
  onMessage,
  replyMessage,
  isReplying,
  setIsReplying
}: UserMessageInputProps) {
  const { sendMessage, sendMessageReply } = useMessageAPI();
  const [loading, setLoading] = useState(false);
  const [messageInput, setMessageInput] = useState<string>('');
  const [channel] = useContext(ChannelContext);
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadFile } = usePostAPI();
  const [isExclusive, setIsExclusive] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [imgURL, setImgURL] = useState<string>('');
  const [blurImgURL, setBlurImgURL] = useState<string>('');

  const handleUpload = async () => {
    if (!file) return null;
    try {
      const formData = new FormData();
      formData.append('file', file);
      const urls = await uploadFile(formData);
      toast.success('Uploaded');
      return urls;
    } catch (error) {
      toast.error('error', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleMessage = async () => {
    setLoading(true);
    try {
      const urls = await handleUpload();
      if (urls) {
        setImgURL(urls.originalUrl);
        setBlurImgURL(urls.blurredUrl);
      }
      const msg = await sendMessage({
        message: messageInput,
        receiverId: channel.receiver.userId,
        imageURL: imgURL ?? null,
        blurredImageURL: blurImgURL ?? null,
        isExclusive: isExclusive,
        price: price
      });
      onMessage(msg);
      setMessageInput('');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async () => {
    if (replyMessage)
      try {
        const urls = await handleUpload();
        if (urls) {
          setImgURL(urls.originalUrl);
          setBlurImgURL(urls.blurredUrl);
        }
        const reply = await sendMessageReply({
          message: messageInput,
          messageId: replyMessage._id,
          receiverId: replyMessage.senderId,
          imageURL: imgURL ?? null,
          blurredImageURL: blurImgURL ?? null,
          isExclusive: replyMessage.isExclusive,
          price: replyMessage.price ?? null
        });
        onMessage(reply);
        setIsReplying(false);
        setMessageInput('');
      } catch (error) {
        console.error(error);
        toast.error('FAILED TO REPLY!');
      }
  };

  return (
    <>
      <ReplyThread
        replyMessage={replyMessage}
        isReplying={isReplying}
        onClose={() => setIsReplying(false)}
      />
      <Box
        width="100%"
        sx={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 8
        }}
      >
        <Container maxWidth="xs" sx={{ padding: 0 }}>
          {isExclusive && (
            <Paper>
              <Typography sx={{ py: 2 }}>This is a paid message</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField
                  type="text"
                  label="Set Price ($)"
                  variant="outlined"
                  size="small"
                  value={price}
                  onChange={(e) => setPrice(+e.target.value.replace(/[^0-9]/g,''))}
                  sx={{ flex: 1 }}
                />
                <Button variant="contained" color="success">
                  Pay
                </Button>
              </Box>
            </Paper>
          )}

          <Paper>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={`Message ${channel.receiver.fullName}`}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (messageInput.trim() !== '')
                    (isReplying ? handleReply : handleMessage)();
                }
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <IconButton onClick={() => setIsExclusive((prev) => !prev)}>
                      <AttachMoneyIcon
                        color={isExclusive ? 'info' : 'action'}
                      />
                    </IconButton>
                  ),
                  endAdornment: (
                    <>
                      {' '}
                      <LoadingButton
                        loading={loading}
                        loadingPosition="start"
                        startIcon={null}
                        disabled={!messageInput}
                        onClick={() => {
                          (isReplying ? handleReply : handleMessage)();
                        }}
                      >
                        <SendIcon />
                      </LoadingButton>
                      <Button onClick={() => inputRef.current?.click()}>
                        <LandscapeIcon />
                      </Button>
                      <input
                        type="file"
                        ref={inputRef}
                        accept="image/*"
                        onChange={(e) => {
                          const input = e.target;
                          if (!input.files?.length) return;
                          setFile(input.files[0]);
                        }}
                        hidden
                      />
                    </>
                  )
                }
              }}
            />
          </Paper>
        </Container>
      </Box>
    </>
  );
}
