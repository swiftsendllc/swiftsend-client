"use client";

import { previewGrid } from "@/components/SearchComponents";
import useAPI from "@/hooks/useAPI";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRef, useState } from "react";

export default function PostPreview() {
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, createPost } = useAPI();

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("file", file);
      const { url } = await uploadFile(formData);
      await createPost({ caption, imageURl: url });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = () => {
    setFile(undefined);
    setImageURL("");
  };

  return (
    <>
      <Stack mt={2}>
        <Stack direction="row" alignContent="center" alignItems="center">
          <IconButton href="/account" LinkComponent={Link}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography alignContent="center" alignItems="center" variant="h6">
            New Post
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

          {imageURL ? (
            <Button
              color="error"
              onClick={handleDeleteImage}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          ) : (
            <Button
              startIcon={<CloudUploadIcon />}
              onClick={() => inputRef.current?.click()}
            >
              Upload
            </Button>
          )}

          <input
            aria-label="upload-files"
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (!e.target.files?.length) return;
              const file = e.target.files[0];
              setFile(file);
              setImageURL(URL.createObjectURL(file));
            }}
            hidden
          />
          <CardContent>
            <TextField
              fullWidth
              id="standard-multiline-flexible"
              variant="standard"
              multiline
              maxRows={4}
              label="Write a caption or a poll"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </CardContent>
        </Card>
        <List sx={{ width: "100%", padding: 0, mb: 1 }}>
          {previewGrid.map((option, idx) => (
            <>
              <ListItemButton
                key={idx}
                sx={{
                  padding: 0,
                  py: 1,
                  borderRadius: 2,
                }}
              >
                <ListItemIcon sx={{ minWidth: 35, pr: 1 }}>
                  {option.leftIcon}
                </ListItemIcon>
                {option.leftIcon ? (
                  <ListItemText disableTypography>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignContent="center"
                      alignItems="center"
                    >
                      <Typography variant="h6" fontWeight={100}>
                        {option.label}
                      </Typography>
                      <Typography variant="body2">
                        {option.rightIcon}
                      </Typography>
                    </Stack>
                  </ListItemText>
                ) : (
                  <ListItemText primary={option.label} />
                )}
              </ListItemButton>

              <Divider />
            </>
          ))}
        </List>
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
            href="/account"
            LinkComponent={Link}
          >
            Share
          </LoadingButton>
        </Stack>
      </Stack>
    </>
  );
}
