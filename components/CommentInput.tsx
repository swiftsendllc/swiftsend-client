"use client";

import usePostAPI from "@/hooks/api/usePostAPI";
import { UserContext } from "@/hooks/context/user-context";
import { CommentPostInput } from "@/hooks/types";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";

interface CommentInputProps {
  postId: string;
  onComment: () => unknown;
}

export function CommentInput({ postId, onComment }: CommentInputProps) {
  const [user] = useContext(UserContext);
  const { commentPost } = usePostAPI();
  const [formData, setFormData] = useState<Partial<CommentPostInput>>({
    comment: "",
  });

  const handleComment = async () => {
    try {
      if (formData.comment) {
        await commentPost(formData, postId);
        setFormData({ comment: "" });
        onComment();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      width="100%"
      sx={{
        position: "fixed",
        bottom: 65,
        left: 0,
        right: 0,
        zIndex: 4,
      }}
    >
      <Container maxWidth="xs" sx={{ p: 0 }}>
        <Paper>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Share your thoughts..."
            autoFocus
            value={formData.comment || ""}
            onChange={(e) => setFormData({ comment: e.target.value })}
            slotProps={{
              input: {
                startAdornment: (
                  <Box mr={1.5}>
                    <Avatar src={user.avatarURL} alt={user.fullName} />
                  </Box>
                ),
                endAdornment: (
                  <Button onClick={handleComment} variant="text" autoFocus>
                    Post
                  </Button>
                ),
              },
            }}
          />
        </Paper>
      </Container>
    </Box>
  );
}
