"use client";
import { top100Films } from "@/components/SearchComponents";
import { PostsEntity } from "@/hooks/types";
import useAPI from "@/hooks/useAPI";
import { UserContext } from "@/hooks/useContext";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import {
  Autocomplete,
  Avatar,
  Container,
  Divider,
  Fab,
  Stack,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SearchFeed from "./SearchFeed";

export default function SearchPage() {
  const { getTimelinePosts } = useAPI();
  const [posts, setPosts] = useState<PostsEntity[]>([]);
  const [query, setQuery] = useState("");
  const [user] = useContext(UserContext);

  const loadPosts = async () => {
    try {
      const posts = await getTimelinePosts();
      setPosts(posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <Container sx={{ p: 0, mt: 2 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignContent="center"
        alignItems="center"
      >
        <Avatar
          src={user.avatarURL}
          alt="Profile picture"
          sx={{ width: 40, height: 40 }}
        />
        <Autocomplete
          freeSolo
          disablePortal
          onInputChange={(_, value) => {
            setQuery(value);
          }}
          sx={{ width: "60%" }}
          open={Boolean(query)}
          options={top100Films.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              slotProps={{
                input: {
                  ...params.InputProps,
                  sx: { borderRadius: "10px" },
                },
              }}
            />
          )}
        />
        <Fab
          sx={{ width: 40, height: 40 }}
          color="primary"
          aria-label="edit"
          variant="circular"
        >
          <NotificationsNoneOutlinedIcon />
        </Fab>
        <Fab
          sx={{ width: 40, height: 40 }}
          color="secondary"
          aria-label="edit"
          variant="circular"
        >
          <BookmarkBorderOutlinedIcon />
        </Fab>
      </Stack>
      <Divider sx={{ mt: 1 }} />
      <SearchFeed posts={posts} />
    </Container>
  );
}
