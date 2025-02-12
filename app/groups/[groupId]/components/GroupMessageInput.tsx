"use client";

import useAPI from "@/hooks/api/useAPI";
import useMessageAPI from "@/hooks/api/useMessageAPI";
import { GroupMessagesEntity } from "@/hooks/entities/messages.entities";
import AddIcon from "@mui/icons-material/Add";
import LandscapeIcon from "@mui/icons-material/Landscape";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, Paper, TextField } from "@mui/material";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import ImagePreviewModalPage from "./ImagePreviewModal";

interface SendGroupMessageInput {
  onSend: (msg: GroupMessagesEntity) => unknown;
}

export default function GroupMessageInputPage({
  onSend,
}: SendGroupMessageInput) {
  const { groupId } = useParams();
  const [, setLoading] = useState(false);
  const { sendGroupMessage } = useMessageAPI();
  const { uploadFile } = useAPI();
  const [messageInput, setMessageInput] = useState<string>("");
  const [imageURLInput, setImageURLInput] = useState<string>("");
  const [imagePreviewModal, setImagePreviewModal] = useState<boolean>(false);
  const [file, setFile] = useState<File>();

  const handleMessage = async () => {
    try {
      const newMessage = await sendGroupMessage(groupId as string, {
        message: messageInput,
      });

      setMessageInput("");
      onSend(newMessage);
    } catch (error) {
      console.error(error);
      toast.error("FAILED TO SEND MESSAGE!");
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { url } = await uploadFile(formData);
      const newImage = await sendGroupMessage(groupId as string, {
        imageURL: url,
      });
      setImageURLInput(url);
      onSend(newImage);
      setImagePreviewModal(false);
      toast.success("UPLOADED");
    } catch (error) {
      console.error(error);
      toast.error("FAILED TO UPLOAD IMAGE!");
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
            placeholder={`Message `}
            value={messageInput || ""}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey ) {
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
                ),
              },
            }}
          />
        </Paper>
      </Container>
      <ImagePreviewModalPage
        isOpen={imagePreviewModal}
        onClose={() => setImagePreviewModal(false)}
        onUpload={handleUpload}
        imageURL={imageURLInput}
        setImageURLInput={setImageURLInput}
        setFile={setFile}
      />
    </Box>
  );
}
