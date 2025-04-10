'use client';

import useAPI from '@/hooks/api/useAPI';
import useMessageAPI from '@/hooks/api/useMessageAPI';
import { GroupMessagesEntity } from '@/hooks/entities/messages.entities';
import AddIcon from '@mui/icons-material/Add';
import LandscapeIcon from '@mui/icons-material/Landscape';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Container, Paper, TextField } from '@mui/material';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ImagePreviewModal } from './ImagePreviewModal';
import ReplyThread from './ReplyThread';

export default function MessageInput({
  onSend,
  isReplying,
  replyMessage,
  setIsReplying
}: {
  onSend: (msg: GroupMessagesEntity) => unknown;
  isReplying: boolean;
  replyMessage: GroupMessagesEntity | null;
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { groupId } = useParams();
  const [, setLoading] = useState<boolean>(false);
  const { sendGroupMessage, groupMessageReply } = useMessageAPI();
  const { uploadFile } = useAPI();
  const [messageInput, setMessageInput] = useState<string>('');
  const [imageURLInput, setImageURLInput] = useState<string>('');
  const [imagePreviewModal, setImagePreviewModal] = useState<boolean>(false);
  const [file, setFile] = useState<File>();

  const handleClose = () => {
    setIsReplying(false);
    setImageURLInput('');
    setMessageInput('');
  };

  const handleMessage = async () => {
    try {
      const newMessage = await sendGroupMessage(groupId as string, {
        message: messageInput
      });

      setMessageInput('');
      onSend(newMessage);
    } catch (error) {
      console.error(error);
      toast.error('FAILED TO SEND MESSAGE!');
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    if (!file) return null;
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { url } = await uploadFile(formData);
      const newImage = await sendGroupMessage(groupId as string, {
        imageURL: url
      });
      setImageURLInput(url);
      onSend(newImage);
      setImagePreviewModal(false);
      toast.success('UPLOADED');
      return url;
    } catch (error) {
      console.error(error);
      toast.error('FAILED TO UPLOAD IMAGE!');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async () => {
    if (replyMessage)
      try {
        const url = await handleUpload();
        const reply = await groupMessageReply(groupId as string, {
          message: messageInput,
          messageId: replyMessage?._id,
          imageURL: url ?? null
        });
        onSend(reply);
        handleClose();
      } catch (error) {
        console.error(error);
        toast.error('FAILED TO REPLY!');
      }
  };

  return (
    <>
      <ReplyThread isReplying={isReplying} replyMessage={replyMessage} onClose={() => setIsReplying(false)} />
      <Box
        sx={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 8,
          px: { md: 40, xs: 'none' }
        }}
      >
        <Container sx={{ padding: 0 }}>
          <Paper>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={`Message `}
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
                    <Box mr={1.5}>
                      <AddIcon />
                    </Box>
                  ),
                  endAdornment: (
                    <>
                      {' '}
                      <LoadingButton
                        loadingPosition="start"
                        startIcon={null}
                        disabled={!(messageInput || imageURLInput)}
                        onClick={handleMessage}
                      >
                        <SendIcon />
                      </LoadingButton>
                      <Button onClick={() => setImagePreviewModal(true)}>
                        <LandscapeIcon />
                      </Button>
                    </>
                  )
                }
              }}
            />
          </Paper>
        </Container>
        <ImagePreviewModal
          isOpen={imagePreviewModal}
          onClose={() => setImagePreviewModal(false)}
          onUpload={handleUpload}
          imageURL={imageURLInput}
          setImageURLInput={setImageURLInput}
          setFile={setFile}
        />
      </Box>
    </>
  );
}
