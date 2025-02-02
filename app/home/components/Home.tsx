"use client";

import usePostAPI from "@/hooks/api/usePostAPI";
import { UserContext } from "@/hooks/context/user-context";
import { PostsEntity } from "@/hooks/entities/posts.entities";
import { Avatar, Card, CardHeader, Container, Divider } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PostCard } from "../../posts/components/Post";
import { HomeHeaderPage } from "./HomeHeader";

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
        <HomeHeaderPage  />
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
