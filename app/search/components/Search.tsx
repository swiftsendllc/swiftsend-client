"use client";
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
import { SearchFeed } from "./SearchFeed";

export default function SearchPage() {
  const { getTimelinePosts, getUserProfile } = useAPI();
  const [posts, setPosts] = useState<PostsEntity[]>([]);
  const [query, setQuery] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]); // store fetched user names
  const [user] = useContext(UserContext);

  const loadPosts = async () => {
    try {
      const posts = await getTimelinePosts();
      setPosts(posts);
    } catch (error) {
      console.log(error);
    }
  };

  const loadUsers = async (query: string) => {
    try {
      const searchUsers = await getUserProfile({
        username: query,
        fullName: query,
      });
      if (searchUsers && searchUsers.users) {
        const fetchedUsers = searchUsers.users.map(
          (user: { fullName: string; username: string }) =>
            user.fullName || user.username
        );
        setOptions(fetchedUsers);
      } else {
        setOptions([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (query) {
      loadUsers(query);
    } else {
      setOptions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          options={options}
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
      <SearchFeed post={posts} />
    </Container>
  );
}
