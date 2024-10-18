"use client";

import { top100Films } from "@/components/SearchComponents";
import { PostsEntity } from "@/hooks/types";
import useAPI from "@/hooks/useAPI";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import {
  Autocomplete,
  Container,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { cluster } from "radash";
import { useEffect, useState } from "react";

const calculateRowCols = (idx: number, igx: number) => {
  return idx % 2 === 0 && (idx === 0 ? igx % 2 === 0 : true)
    ? 1
    : igx % 2 !== 0 && idx === 1
    ? 1
    : 2;
};

export default function SearchPage() {
  const { getPosts } = useAPI();
  const [posts, setPosts] = useState<PostsEntity[]>([]);
  const [query, setQuery] = useState("");

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

  const imageGroups = cluster(posts, 3);

  return (
    <Container sx={{ p: 0 }}>
      <Autocomplete
        freeSolo
        disablePortal
        onInputChange={(_, value) => {
          setQuery(value);
        }}
        sx={{ width: "100%" }}
        open={Boolean(query)}
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            slotProps={{
              input: {
                ...params.InputProps,
                sx: { borderRadius: "30px" },
              },
            }}
          />
        )}
      />
      <ImageList
        sx={{ width: "100%", height: "auto" }}
        cols={3}
        gap={4}
        rowHeight={125}
      >
        {imageGroups.map((images, igx) =>
          images.map((post, idx) => (
            <ImageListItem
              key={idx}
              rows={calculateRowCols(idx, igx)}
              cols={calculateRowCols(idx, igx)}
            >
              <Image
                src={post.imageURL}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                alt={post.caption || "image"}
                width={400}
                height={400}
                priority
              />
              <ImageListItemBar
                sx={{ background: "transparent" }}
                position="bottom"
                actionIcon={
                  <IconButton sx={{ color: "white" }} aria-label="star">
                    <FavoriteIcon sx={{ width: 15, height: 15 }} />
                    <ModeCommentIcon sx={{ width: 15, height: 15 }} />
                  </IconButton>
                }
                actionPosition="right"
              />
            </ImageListItem>
          ))
        )}
      </ImageList>
    </Container>
  );
}
