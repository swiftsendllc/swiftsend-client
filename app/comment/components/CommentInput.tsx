"use client";

import usePostAPI from "@/hooks/api/usePostAPI";
import { UserContext } from "@/hooks/context/user-context";
import { CommentPostInput } from "@/hooks/entities/posts.entities";
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
  const { commentPost } = usePostAPI();
  const [user] = useContext(UserContext);
  const [comment, setComment] = useState<Partial<CommentPostInput>>({
    comment: "",
  });

  const handleComment = async () => {
    try {
      if (comment.comment) {
        await commentPost(comment, postId);
        setComment({ comment: "" });
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
            value={comment.comment || ""}
            onChange={(e) => setComment({ comment: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleComment();
              }
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <Box mr={1.5}>
                    <Avatar src={user.avatarURL} alt={user.fullName} />
                  </Box>
                ),
                endAdornment: (
                  <Button
                    variant="text"
                    type="submit"
                    disabled={!comment.comment}
                    onClick={handleComment}
                  >
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
