"use client";

import { ChannelContext } from "@/hooks/channel-context";
import useAPI from "@/hooks/useAPI";
import AddIcon from "@mui/icons-material/Add";
import LandscapeIcon from "@mui/icons-material/Landscape";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Container, Paper, TextField } from "@mui/material";
import { useContext, useState } from "react";

interface UserMessageInputProps {
  onMessage: () => unknown;
}

export default function MessageInput({ onMessage }: UserMessageInputProps) {
  const { sendMessage } = useAPI();
  const [messageInput, setMessageInput] = useState("");
  const [channel] = useContext(ChannelContext);

  const handleMessage = async () => {
    try {
      await sendMessage({
        message: messageInput,
        receiverId: channel.receiver.userId,
      });
      setMessageInput("");
      onMessage();
    } catch (error) {
      console.log(error);
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
      }}
    >
      <Container maxWidth="xs" sx={{ padding: 0 }}>
        <Paper>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="share your thoughts"
            value={messageInput || ""}
            onChange={(e) => setMessageInput(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <Box>
                    <AddIcon />
                  </Box>
                ),
                endAdornment: (
                  <>
                    {" "}
                    <Button onClick={handleMessage}>
                      <SendIcon />
                    </Button>
                    <Button>
                      <LandscapeIcon />
                    </Button>
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
