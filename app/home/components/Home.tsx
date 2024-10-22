"use client";

import { top100Films } from "@/components/SearchComponents";
import { PostsEntity } from "@/hooks/types";
import useAPI from "@/hooks/useAPI";
import { UserContext } from "@/hooks/useContext";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
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
import { PostCard } from "./Post";

export default function HomePage() {
  const [user] = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<PostsEntity[]>([]);
  const { getTimelinePosts } = useAPI();

  // Function to load all posts
  const loadPosts = async () => {
    try {
      const posts = await getTimelinePosts();
      setPosts(posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadPosts(); // Load posts on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container sx={{ p: 0, mt: 2, mb: 8 }}>
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
            <EditIcon />
          </Fab>
          <Fab
            sx={{ width: 40, height: 40 }}
            color="secondary"
            aria-label="edit"
            variant="circular"
          >
            <SettingsIcon />
          </Fab>
        </Stack>
        <Divider sx={{ mt: 1 }} />
        {posts.map((post) => (
          <PostCard  key={post._id} post={post} />
        ))}
      </Container>
    </>
  );
}
