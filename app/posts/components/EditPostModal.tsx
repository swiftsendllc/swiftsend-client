"use client";

import Transition from "@/components/Transition";
import { PostsEntity, UpdatePostInput } from "@/hooks/types";
import useAPI from "@/hooks/useAPI";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const { editPost } = useAPI();
  const [formData, setFormData] = useState<Partial<UpdatePostInput>>({
    caption: post.caption,
  });
  const router = useRouter();

  useEffect(() => {
    setOpen(isOpen);
    setCaption(post.caption);
    setFormData({ caption: post.caption });
  }, [isOpen, post]);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const handleOnChange = async () => {
    setLoading(true);
    try {
      const data = await editPost(formData, post._id);
      setCaption(data.caption);
      handleClose();
      router.push("/account");
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
    setDidChange(true);
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
                onChange={(e) => handleInputChange(e.target.value)}
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
              sx={{width: "100%"}}
              style={{ color: "var(--warning)" }}
              onClick={handleClose}
            >
              Discard
            </Button>
            <LoadingButton
              fullWidth
              sx={{width: "100%"}}
              loading={loading}
              variant="contained"
              type="submit"
              disabled={!didChange}
              onClick={handleOnChange}
            >
              Post
            </LoadingButton>
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
}
