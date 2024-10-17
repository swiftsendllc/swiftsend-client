"use client";
import { PostsEntity } from "@/hooks/types";
import useAPI from "@/hooks/useAPI";
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
import { useEffect, useState } from "react";

export default function AccountPage() {
  const { getPosts } = useAPI();
  const [posts, setPosts] = useState<PostsEntity[]>([]);

  const loadPosts = async () => {
    try {
      const posts = await getPosts();
      setPosts(posts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box  mb={6}>
        {posts.length === 0 ? (
          <Stack
            my="10"
            alignContent="center"
            alignItems="center"
            justifyContent="center"
          >
            <CameraAltSharpIcon sx={{ width: 60, height: 60 }} />
            <Typography variant="h5" fontWeight="100">
              No Image
            </Typography>
            <Typography variant="h6" fontWeight="50">
              This user has no image.
            </Typography>
          </Stack>
        ) : (
          <ImageList
            sx={{ width: "100%", height: "auto" }}
            cols={3}
            gap={8}
            rowHeight={164}
          >
            {posts.map((post) => (
              <ImageListItem key={post._id}>
                <Image
                  src={post.imageURL}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                  alt={post.caption || "image"}
                  width={300}
                  height={100}
                  priority
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
