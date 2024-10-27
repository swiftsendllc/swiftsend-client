"use client";
import { postSamples } from "@/components/SearchComponents";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CameraAltSharpIcon from "@mui/icons-material/CameraAltSharp";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";

export default function TagPage() {
  return (
    <>
      <Box mb={2}>
        {postSamples.length === 0 ? (
          <Stack
            my="10"
            alignContent="center"
            alignItems="center"
            justifyContent="center"
          >
            <CameraAltSharpIcon sx={{ width: 60, height: 60 }} />
            <Typography variant="h5" fontWeight="100">
              No videos
            </Typography>
            <Typography variant="h6" fontWeight="50">
              This user has no video.
            </Typography>
          </Stack>
        ) : (
          <ImageList
            sx={{ width: "100%", height: "auto" }}
            cols={3}
            gap={8}
            rowHeight={164}
          >
            {postSamples.map((post, idx) => (
              <ImageListItem key={idx}>
                <Image
                  src={post.imageURL}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                  alt={post.title || "image"}
                  width={300}
                  height={100}
                  loading="lazy"
                />
                <ImageListItemBar
                  sx={{ background: "transparent" }}
                  position="top"
                  actionIcon={
                    <IconButton sx={{ color: "white" }} aria-label="star">
                      <StarBorderIcon />
                    </IconButton>
                  }
                  actionPosition="right"
                />
                <ImageListItemBar
                  sx={{ background: "transparent" }}
                  position="bottom"
                  actionIcon={
                    <IconButton sx={{ color: "white" }} aria-label="bookmark">
                      <BookmarkBorderOutlinedIcon />
                    </IconButton>
                  }
                  actionPosition="right"
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>
    </>
  );
}
