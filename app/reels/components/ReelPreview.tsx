"use client";

import { previewGrid } from "@/components/SearchComponents";
import useAPI from "@/hooks/api/useAPI";
import userReelAPI from "@/hooks/api/useReelAPI";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
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
import { useRouter } from "next/navigation";
import { Fragment, useRef, useState } from "react";
import toast from "react-hot-toast";

export function ReelPreview() {
  const router = useRouter();
  const { uploadFile } = useAPI();
  const { createReel } = userReelAPI();
  const [file, setFile] = useState<File>();
  const [caption, setCaption] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { url } = await uploadFile(formData);
      console.log("The url is :",url )
      await createReel({ caption, videoURL: url });
      setVideoURL(url);
      toast.success("Successfully uploaded...");
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload reel!");
    } finally {
      setLoading(false);
    }
  };

  const handleVideoDelete = () => {
    setFile(undefined);
    setVideoURL("");
  };

  return (
    <>
      <Container
        maxWidth="xs"
        sx={{
          alignContent: "center",
          alignItems: "center",
          mb: 6,
        }}
      >
        <Stack mt={2}>
          <Stack direction="row" alignContent="center" alignItems="center">
            <IconButton onClick={() => router.back()}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography alignContent="center" alignItems="center" variant="h6">
              New Video
            </Typography>
          </Stack>
          <Divider />
        </Stack>
        <Stack>
          <Card sx={{ padding: 0, marginTop: 5 }}>
            {videoURL && (
              <CardMedia
                component="video"
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
                src={videoURL}
                title="green iguana"
                loop={false}
                autoPlay={true}
                muted={false}
                controls
              />
            )}
            {videoURL ? (
              <Button
                onClick={handleVideoDelete}
                color="error"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            ) : (
              <Button
                onClick={() => inputRef.current?.click()}
                startIcon={<CloudUploadIcon />}
              >
                Upload
              </Button>
            )}
            <input
              aria-label="upload-files"
              ref={inputRef}
              type="file"
              accept="video/*"
              onChange={(e) => {
                if (!e.target.files?.length) return;
                const file = e.target.files[0];
                setFile(file);
                setVideoURL(URL.createObjectURL(file));
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
                focused
                autoFocus
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </CardContent>
          </Card>
          <List sx={{ width: "100%", padding: 0, mb: 1 }}>
            {previewGrid.map((option, idx) => (
              <Fragment key={idx}>
                <ListItemButton
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
              </Fragment>
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
              onClick={() => {
                handleVideoDelete();
                router.back();
              }}
            >
              Discard
            </Button>
            <LoadingButton
              loading={loading}
              disabled={!(caption && videoURL)}
              fullWidth
              variant="contained"
              type="submit"
              onClick={handleSubmit}
            >
              Share
            </LoadingButton>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
