"use client";

import Transition from "@/components/Transition";
import { UpdatePostInput } from "@/hooks/types";
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
}: {
  isOpen: boolean;
  onClose?: () => unknown;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);

  const [didChange, setDidChange]= useState(false)

  const [caption, setCaption] = useState("");
  const [imageURL] = useState("");
  const [file] = useState<File>();
  const { editPost } = useAPI();
  const [currentField, setCurrentField] = useState<string>("");
const [formData, setFormData] = useState<Partial<UpdatePostInput>>({
  caption: 
})
  const router = useRouter();

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);
    try {
      await editPost({ caption });
      router.push("/account");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    onClose?.();
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
          <Card sx={{ padding: 0, marginTop: 5 }}>
            {imageURL && (
              <CardMedia
                sx={{
                  objectFit: "contain",
                }}
                component="img"
                image={imageURL}
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
                onChange={(e) => {
                  setCaption(e.target.value);
                  setCurrentField(caption);
                }}
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
              style={{ color: "var(--warning)" }}
              onClick={handleClose}
            >
              Discard
            </Button>
            <LoadingButton
              fullWidth
              loading={loading}
              variant="contained"
              type="submit"
              disabled={!(caption && imageURL)}
              onClick={handleSubmit}
            >
              Post
            </LoadingButton>
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
}
