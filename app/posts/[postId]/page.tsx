"use client";

import { PostCard } from "@/app/home/components/Post";
import { PostsEntity } from "@/hooks/types";
import useAPI from "@/hooks/useAPI";
import { Container } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SinglePost() {
  const { getPost } = useAPI();
  const { postId } = useParams();
  const [post, setPost] = useState<PostsEntity>();

  const loadPost = async () => {
    try {
      const post = await getPost(postId as string);
      setPost(post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (postId) loadPost();
  }, [postId]); // eslint-disable-line

  return (
    <Container maxWidth="xs">
      {post && (
        <PostCard  allowComments post={post} onMutation={() => loadPost()} />
      )}
    </Container>
  );
}
