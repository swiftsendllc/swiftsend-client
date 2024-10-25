"use client";
import { PostsEntity, UserProfilesEntity } from "@/hooks/types";
import useAPI from "@/hooks/useAPI";
import { UserContext } from "@/hooks/useContext";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import {
  Avatar,
  Card,
  CardHeader,
  Container,
  Divider,
  Fab,
  Stack,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { SearchFeed } from "./SearchFeed";

export default function SearchPage() {
  const { getTimelinePosts, getUserProfiles } = useAPI();
  const [posts, setPosts] = useState<PostsEntity[]>([]);
  const [user] = useContext(UserContext);
  const [users, setUsers] = useState<UserProfilesEntity[]>([]);
  const [isCardOpen, setIsCardOpen] = useState(false);

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
      const searchUsers = (await getUserProfiles(
        query
      )) as UserProfilesEntity[];
      setUsers(searchUsers);
    } catch (error) {
      console.log(error);
    }
  };
  const [debouncedSearch] = useDebounce(loadUsers, 350);

  useEffect(() => {
    loadPosts();
  }, []); // eslint-disable-line

  return (
    <Container sx={{ p: 0, mt: 2, mb: 8.8 }} style={{ padding: 0 }}>
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

        <TextField
          label="Search"
          sx={{ width: "60%" }}
          slotProps={{
            input: {
              sx: { borderRadius: "10px" },
            },
          }}
          onFocus={() => setIsCardOpen(true)}
          onChange={(e) => {
            debouncedSearch(e.target.value);
          }}
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
          href="/saves"
          LinkComponent={Link}
        >
          <BookmarkBorderOutlinedIcon />
        </Fab>
      </Stack>
      <Divider sx={{ mt: 1 }} />

      {isCardOpen ? (
        <>
          {users.map((user) => (
            <Card sx={{ mb: 0.5, width: "100%", p: 0, m: 0 }} key={user.userId}>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="recipe"
                    src={user.avatarURL}
                    alt={user.fullName}
                  />
                }
                title={user.fullName}
                subheader={user.username}
              />
            </Card>
          ))}
        </>
      ) : (
        <SearchFeed post={posts} />
      )}
    </Container>
  );
}
