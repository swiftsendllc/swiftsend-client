'use client';

import InputElement from '@/components/InputElement';
import useMessageAPI from '@/hooks/api/useMessageAPI';
import usePostAPI from '@/hooks/api/usePostAPI';
import { ChannelContext } from '@/hooks/context/channel-context';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LandscapeIcon from '@mui/icons-material/Landscape';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Container, IconButton, Paper, Stack, TextField } from '@mui/material';
import Image from 'next/image';
import React, { useContext, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import ReplyThread from './ReplyThread';

interface UserMessageInputProps {
  onMessage: (msg: MessagesEntity) => unknown;
  replyMessage: MessagesEntity | null;
  isReplying: boolean;
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MessageInput({ onMessage, replyMessage, isReplying, setIsReplying }: UserMessageInputProps) {
  const { sendMessage, sendMessageReply } = useMessageAPI();
  const [loading, setLoading] = useState(false);
  const [messageInput, setMessageInput] = useState<string>('');
  const [channel] = useContext(ChannelContext);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadFile } = usePostAPI();
  const [isExclusive, setIsExclusive] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [objectUrls, setObjectUrls] = useState<string[]>([]);

  const handleUpload = async () => {
    if (!files) return null;

    try {
      const formData = new FormData();
      files.map((file) => {
        formData.append('files', file);
      });

      if (isExclusive) {
        const urls = await uploadFile(formData);
        const imgUrls = urls?.map((file) => file.originalFile.url);
        const blurImageUrls = urls?.map((file) => file.blurredFile.url);
        toast.success('Uploaded');
        return { imgUrls, blurImageUrls };
      }
    } catch (error) {
      toast.error('error', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setMessageInput('');
    setObjectUrls([]);
    setPrice(0);
    setFiles([]);
    setIsExclusive(false);
  };

  const handleMessage = async () => {
    setLoading(true);
    try {
      const urls = await handleUpload();

      const msg = await sendMessage({
        message: messageInput,
        receiverId: channel.receiver.userId,
        imageUrls: urls?.imgUrls ?? null,
        blurredImageUrls: urls?.blurImageUrls ?? null,
        isExclusive: isExclusive,
        price: price
      });
      onMessage(msg);
      handleCancel();
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

        const reply = await sendMessageReply({
          message: messageInput,
          messageId: replyMessage._id,
          receiverId: replyMessage.senderId,
          imageUrls: urls?.imgUrls ?? null,
          blurredImageUrls: urls?.blurImageUrls ?? null,
          isExclusive: replyMessage.isExclusive,
          price: replyMessage.price ?? null
        });
        onMessage(reply);
        setIsReplying(false);
        handleCancel();
      } catch (error) {
        console.error(error);
        toast.error('FAILED TO REPLY!');
      }
  };

  return (
    <>
      <ReplyThread replyMessage={replyMessage} isReplying={isReplying} onClose={() => setIsReplying(false)} />
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
            <>
              <Paper>
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="nowrap"
                  sx={{
                    maxWidth: '100%',
                    maxHeight: 150,
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {objectUrls.map((url, idx) => (
                    <Box key={idx} sx={{ position: 'relative' }}>
                      <Image
                        alt={url}
                        src={url}
                        width={200}
                        height={200}
                        style={{
                          width: 100,
                          height: 100,
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                        onClick={() => {
                          setObjectUrls(objectUrls.filter((_, id) => id !== idx));
                          setFiles(files.filter((_, id) => id !== idx));
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
                <IconButton sx={{ py: 2 }} onClick={() => inputRef.current?.click()}>
                  <AddPhotoAlternateIcon />
                  <InputElement inputRef={inputRef} setFiles={setFiles} setObjectUrls={setObjectUrls} />
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    type="text"
                    label="Set Price ($)"
                    variant="outlined"
                    size="small"
                    value={price}
                    onChange={(e) => setPrice(+e.target.value.replace(/[^0-9]/g, ''))}
                    sx={{ flex: 1 }}
                  />
                  <Button variant="contained" color="warning" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Box>
              </Paper>
            </>
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
                  if (messageInput.trim() !== '') (isReplying ? handleReply : handleMessage)();
                }
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <IconButton onClick={() => setIsExclusive(true)}>
                      <AttachMoneyIcon color={isExclusive ? 'info' : 'action'} />
                    </IconButton>
                  ),
                  endAdornment: (
                    <>
                      {' '}
                      <LoadingButton
                        loading={loading}
                        loadingPosition="start"
                        startIcon={null}
                        disabled={!messageInput || (isExclusive && !price)}
                        onClick={() => {
                          (isReplying ? handleReply : handleMessage)();
                        }}
                      >
                        <SendIcon />
                      </LoadingButton>
                      <Button onClick={() => inputRef.current?.click()}>
                        <LandscapeIcon />
                      </Button>
                      <InputElement inputRef={inputRef} setFiles={setFiles} setObjectUrls={() => null} />
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
