"use client";

import usePostAPI from "@/hooks/api/usePostAPI";
import { UserContext } from "@/hooks/context/user-context";
import { PostsEntity } from "@/hooks/types";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
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
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PostCard } from "./Post";

export default function HomePage() {
  const [user] = useContext(UserContext);
  const [posts, setPosts] = useState<PostsEntity[]>([]);
  const { getTimelinePosts } = usePostAPI();
  const [isCardOpen, setIsCardOpen] = useState(false);

  const handleSearch = () => {
    setIsCardOpen(true);
  };

  // Function to load all posts
  const loadPosts = async () => {
    try {
      const posts = await getTimelinePosts();
      setPosts(posts);
    } catch (error) {
      console.log(error);
      toast.success("Loading feed...");
    }
  };

  useEffect(() => {
    loadPosts(); // Load posts on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container maxWidth="xs" style={{ padding: 0 }} sx={{ mt: 2, mb: 8 }}>
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
            label="𝔖𝔢𝔞𝔯𝔠𝔥"
            sx={{ width: "60%" }}
            slotProps={{
              input: {
                sx: { borderRadius: "10px" },
              },
            }}
            onClick={handleSearch}
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
        {isCardOpen ? (
          <Card sx={{ mb: 0.5, width: "100%", p: 0, m: 0 }}>
            <CardHeader
              avatar={
                <Avatar
                  aria-label="recipe"
                  src={user.avatarURL}
                  alt={user.fullName}
                />
              }
              title={user.fullName}
            />
          </Card>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </Container>
    </>
  );
}
