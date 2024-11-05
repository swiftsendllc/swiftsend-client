"use client";

import Transition from "@/components/Transition";
import usePostAPI from "@/hooks/api/usePostAPI";
import { PostsEntity, UpdatePostInput } from "@/hooks/types";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditPostModal({
  isOpen,
  onClose,
  post,
}: {
  isOpen: boolean;
  onClose?: () => unknown;
  post: PostsEntity;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);

  const [didChange, setDidChange] = useState(false);

  const [caption, setCaption] = useState(post.caption);
  const { editPost } = usePostAPI();
  const [formData, setFormData] = useState<Partial<UpdatePostInput>>({
    caption: post.caption,
  });

  useEffect(() => {
    setOpen(isOpen);
    setCaption(post.caption);
    setFormData({ caption: post.caption });
  }, [isOpen, post]);

  const handleClose = () => {
    setOpen(false);
    setDidChange(false);
    onClose?.();
  };

  const handleOnChange = async () => {
    setLoading(true);
    try {
      const data = await editPost(formData, post._id);
      setCaption(data.caption);
      handleClose();
      toast.success("Post edited");
    } catch (error) {
      console.log(error);
      toast.error("Failed to edit post!");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (value: string) => {
    setFormData((previous) => ({
      ...previous,
      caption: value,
    }));
    setCaption(value);
    setDidChange(value.trim() !== post.caption); // enables when caption is not empty
  };

  return (
    <>
      <Dialog
        sx={{
          alignContent: "center",
          alignItems: "center",
          mb: 6,
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="xs"
        fullWidth
        onClose={handleClose}
      >
        <Stack mt={2}>
          <Stack direction="row" alignContent="center" alignItems="center">
            <IconButton onClick={handleClose}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography alignContent="center" alignItems="center" variant="h6">
              Edit Post
            </Typography>
          </Stack>
          <Divider />
        </Stack>
        <Stack>
          <Card sx={{ padding: 0 }}>
            {post.imageURL && (
              <CardMedia
                sx={{
                  objectFit: "contain",
                }}
                component="img"
                image={post.imageURL}
                title="green iguana"
              />
            )}

            <CardContent>
              <TextField
                fullWidth
                id="standard-multiline-flexible"
                variant="standard"
                multiline
                maxRows={4}
                label="Edit your caption"
                value={caption}
                onChange={(e) => handleInputChange(e.target.value.trim())}
                focused
                autoFocus
              />
            </CardContent>
          </Card>

          <Divider />

          <Stack
            direction="row"
            spacing={1}
            sx={{
              mb: 1,
              justifyContent: "center",
              alignContent: "center",
              padding: 0,
            }}
          >
            <Button
              variant="contained"
              fullWidth
              sx={{ width: "100%" }}
              style={{ color: "var(--warning)" }}
              onClick={handleClose}
            >
              Discard
              <CloseIcon />
            </Button>
            <LoadingButton
              fullWidth
              sx={{ width: "100%" }}
              loading={loading}
              variant="contained"
              type="submit"
              disabled={!didChange || caption.trim() === ""}
              onClick={handleOnChange}
            >
              Post
              <SendIcon />
            </LoadingButton>
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
}
