"use client";

import useAPI from "@/hooks/api/useAPI";
import useMessageAPI from "@/hooks/api/useMessageAPI";
import { ChannelContext } from "@/hooks/context/channel-context";
import { MessagesEntity } from "@/hooks/entities/messages.entities";
import AddIcon from "@mui/icons-material/Add";
import LandscapeIcon from "@mui/icons-material/Landscape";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, Paper, TextField } from "@mui/material";
import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";

interface UserMessageInputProps {
  onMessage: (msg: MessagesEntity) => unknown;
}

export default function MessageInput({ onMessage }: UserMessageInputProps) {
  const { sendMessage } = useMessageAPI();
  const [loading, setLoading] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [channel] = useContext(ChannelContext);

  const [, setImageURL] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadFile } = useAPI();

  const handleMessage = async () => {
    setLoading(true);
    try {
      const msg = (await sendMessage({
        message: messageInput,
        receiverId: channel.receiver.userId,
      })) as MessagesEntity;
      setMessageInput("");
      onMessage(msg);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: File) => {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { url } = await uploadFile(formData);
      await sendMessage({ imageURL: url, receiverId: channel.receiver.userId });
      setImageURL(url);
      toast.success("Uploaded");
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload image!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      width="100%"
      sx={{
        position: "fixed",
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 8,
      }}
    >
      <Container maxWidth="xs" sx={{ padding: 0 }}>
        <Paper>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={`Message ${channel.receiver.fullName}`}
            value={messageInput || ""}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleMessage();
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
                    {" "}
                    <LoadingButton
                      loading={loading}
                      loadingPosition="start"
                      startIcon={null}
                      disabled={!messageInput || messageInput.trim() === ""}
                      onClick={handleMessage}
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
                        if (!e.target.files?.length) return;
                        handleUpload(e.target.files[0]);
                      }}
                      hidden
                    />
                  </>
                ),
              },
            }}
          />
        </Paper>
      </Container>
    </Box>
  );
}
