"use client";
import { grid } from "@/components/SearchComponents";
import VerifiedTopNav from "@/components/VerifiedTopNav";
import { PostsEntity } from "@/hooks/types";
import useAPI from "@/hooks/useAPI";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CameraAltSharpIcon from "@mui/icons-material/CameraAltSharp";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Box,
  Card,
  CardActionArea,
  Divider,
  Icon,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const _pathName = usePathname();
  const { id } = useParams();

  const [posts, setPosts] = useState<PostsEntity[]>([]);
  const { getPosts } = useAPI();

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

  const pathName = _pathName === `/accounts/${id}` ? "/accounts" : _pathName;
  return (
    <>
      <Box mt={{ md: 2, sm: 2 }} mb={2}>
        <VerifiedTopNav />
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignContent="center"
          alignItems="center"
        >
          {grid.map((item, idx) => (
            <Card
              key={idx}
              sx={{
                backgroundColor: "transparent",
                boxShadow: "none",
              }}
            >
              <CardActionArea href={item.value} LinkComponent={Link}>
                <Stack
                  alignItems="center"
                  alignContent="center"
                  spacing={0}
                  p={1}
                >
                  <Icon color={pathName === item.value ? "primary" : "action"}>
                    {item.icon}
                  </Icon>
                </Stack>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
        <Divider sx={{ mt: 2 }} />

        {/* The Image List displays a collection of images in an organized grid. */}

        <ImageList
          sx={{ width: "100%", height: "auto" }}
          cols={3}
          gap={8}
          rowHeight={164}
        >
          {posts.map((option) => (
            <ImageListItem key={option._id}>
              {option.imageURL ? (
                <Image
                  src={option.imageURL}
                  loading="lazy"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                  alt="img"
                  width={300}
                  height={100}
                />
              ) : (
                <Stack
                  my="10"
                  alignContent="center"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CameraAltSharpIcon sx={{ width: 60, height: 60 }} />
                  <Typography variant="h5" fontWeight="100">
                    Photos of yours
                  </Typography>
                  <Typography variant="h6" fontWeight="50">
                    Your photos, they&apos;ll appear here.{" "}
                  </Typography>
                </Stack>
              )}

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
                  <IconButton sx={{ color: "white" }} aria-label="star">
                    <BookmarkBorderOutlinedIcon />
                  </IconButton>
                }
                actionPosition="right"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </>
  );
}
