"use client";

import { CommentInput } from "@/components/CommentInput";
import TopBackNav from "@/components/TopBackNav";
import { PostsEntity } from "@/hooks/types";
import useAPI from "@/hooks/useAPI";
import AddIcon from "@mui/icons-material/Add";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  debounce,
  Divider,
  Fab,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PostProps {
  post: PostsEntity;
  allowComments?: boolean;
  onMutation?: () => unknown;
}

interface SaveButtonProps {
  onClick: () => unknown;
  isSaved: boolean;
}

export const PostCard = ({
  post,
  allowComments = false,
  onMutation,
}: PostProps) => {
  const { likePost, savePost } = useAPI();
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);

  const handleLike = debounce(async (postId: string) => {
    try {
      const post = (await likePost(postId)) as PostsEntity;
      setIsLiked(post.isLiked);
      setLikeCount(post.likeCount);
    } catch (error) {
      console.log(error);
    }
  }, 250);

  const handleSave = debounce(async (postId: string) => {
    try {
      const post = (await savePost(postId)) as PostsEntity;
      setIsSaved(post.isSaved);
    } catch (error) {
      console.log(error);
    }
  }, 250);

  return (
    <Container maxWidth="xs" sx={{ px: 0 }}>
      {allowComments && <TopBackNav />}
      <Card key={post._id} sx={{ mb: 0.5, width: '100%' , p: 0, m: 0}}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              src={post.user.avatarURL}
              alt={post.user.fullName}
            />
          }
          action={
            <Stack>
              <Fab sx={{ height: 20 }} aria-label="settings" variant="extended">
                <AddIcon />
                connect
              </Fab>
              <SaveButton
                isSaved={isSaved}
                onClick={() => handleSave(post._id)}
              />
            </Stack>
          }
          title={post.user.fullName}
          subheader={new Date(post.createdAt).toLocaleString()}
        />
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {post.caption}
        </Typography>
        <CardMedia
          component="img"
          height="194"
          image={post.imageURL}
          alt="Paella dish"
        />
        <CardContent sx={{ fontWeight: "200" }}>
          <Stack direction="row" justifyContent="space-between">
            <Box alignItems="left">{`${likeCount} ❤`}</Box>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box>{` ${post.commentCount} 💬`}</Box>
              <Box>{`${post.shareCount} ➦`}</Box>
            </Stack>
          </Stack>
        </CardContent>
        <Divider sx={{ mb: 1 }} />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignContent="center"
          alignItems="center"
        >
          <LikeButton isLiked={isLiked} onClick={() => handleLike(post._id)} />
          <IconButton
            href={`/posts/${post._id}`}
            aria-label="show more"
            LinkComponent={Link}
          >
            <ModeCommentOutlinedIcon />
          </IconButton>
          <IconButton aria-label="share">
            <SendOutlinedIcon />
          </IconButton>
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        </Stack>

        {post.comments && post.comments.length > 0 && (
          <>
            <Divider sx={{ mt: 1 }} />
            <Box
              overflow="auto"
              display="flex"
              flexDirection="column"
              sx={{ pb: 20, px: 1 }}
            >
              {post.comments.map((comment) => (
                <Stack key={comment._id} direction="row" spacing={1} mt={2}>
                  <Avatar
                    src={comment.user.avatarURL}
                    alt={comment.user.fullName}
                  />
                  <Paper
                    sx={{ width: "100%", backgroundColor: "inherit" }}
                    variant="elevation"
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignContent="center"
                      alignItems="center"
                    >
                      <Typography ml={1} py={0}>
                        {comment.user.fullName}
                      </Typography>
                      <IconButton>
                        <MoreHorizIcon />
                      </IconButton>
                    </Stack>
                    <Typography
                      mx={1}
                      mb={1}
                      variant="subtitle2"
                      fontWeight={200}
                      color="textSecondary"
                    >
                      {comment.comment}
                    </Typography>
                  </Paper>
                </Stack>
              ))}
            </Box>
          </>
        )}
      </Card>
      {allowComments && (
        <CommentInput postId={post._id} onComment={() => onMutation?.()} />
      )}
    </Container>
  );
};

interface LikeButtonProps {
  onClick: () => unknown;
  isLiked: boolean;
}

const LikeButton = (props: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(props.isLiked);
  useEffect(() => setIsLiked(props.isLiked), [props.isLiked]);

  return (
    <IconButton
      onClick={() => {
        props.onClick();
        setIsLiked((isLiked) => !isLiked);
      }}
      aria-label="favorites"
    >
      {isLiked ? (
        <ThumbUpIcon color="error" />
      ) : (
        <ThumbUpOutlinedIcon color="primary" />
      )}
    </IconButton>
  );
};

const SaveButton = (props: SaveButtonProps) => {
  const [isSaved, setIsSaved] = useState(props.isSaved);
  useEffect(() => setIsSaved(props.isSaved), [props.isSaved]);

  return (
    <IconButton
      sx={{ padding: 0 }}
      aria-label="bookmark"
      onClick={() => {
        props.onClick();
        setIsSaved((isSaved) => !isSaved);
      }}
    >
      {isSaved ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
    </IconButton>
  );
};
