"use client";

import { CommentInput } from "@/components/CommentInput";
import TopBackNav from "@/components/TopBackNav";
import useAPI from "@/hooks/api/useAPI";
import usePostAPI from "@/hooks/api/usePostAPI";
import { PostsEntity } from "@/hooks/types";
import { UserContext } from "@/hooks/context/user-context";
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
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  debounce,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

interface PostProps {
  post: PostsEntity;
  allowComments?: boolean;
  onMutation?: () => unknown;
}

interface LikeButtonProps {
  onClick: () => unknown;
  isLiked: boolean;
}

interface SaveButtonProps {
  onClick: () => unknown;
  isSaved: boolean;
}

interface FollowButtonProps {
  onClick: () => unknown;
  isFollowing: boolean;
}

export const PostCard = ({
  post,
  allowComments = false,
  onMutation,
}: PostProps) => {
  const { followProfile } = useAPI();
  const { likePost, savePost } = usePostAPI();
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [isFollowing, setIsFollowing] = useState(post.isFollowing);
  const [user] = useContext(UserContext);
  const router = useRouter();

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

  const handleFollow = async (userId: string) => {
    try {
      const followUser = (await followProfile(userId)) as PostsEntity;
      setIsFollowing(followUser.isFollowing);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {allowComments && <TopBackNav />}
      <Card key={post._id} sx={{ mb: 0.5, width: "100%", padding: 0, m: 0 }}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              src={post.user.avatarURL}
              alt={post.user.fullName}
            />
          }
          action={
            post.userId !== user.userId ? (
              <FollowButton
                isFollowing={isFollowing}
                onClick={() => handleFollow(post.userId)}
              />
            ) : null
          }
          title={
            <>
              <IconButton onClick={() => router.push(`/${post.user.username}`)}>
                <Typography>{post.user.fullName}</Typography>
              </IconButton>
            </>
          }
          subheader={moment(post.createdAt).format("LLL")}
        />
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {post.caption}
        </Typography>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
            }}
            src={post.imageURL}
            alt={post.caption || "Instagram image"}
            width={400}
            height={400}
          />

          <Box
            sx={{ color: "white", position: "absolute", bottom: 8, right: 8 }}
            aria-label="save"
          >
            <SaveButton
              isSaved={isSaved}
              onClick={() => handleSave(post._id)}
            />
          </Box>
        </Box>

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
    </>
  );
};

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
      {isSaved ? (
        <BookmarkIcon color="primary" />
      ) : (
        <BookmarkBorderIcon color="error" />
      )}
    </IconButton>
  );
};

const FollowButton = (props: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(props.isFollowing);
  useEffect(() => setIsFollowing(isFollowing), [isFollowing]);

  return (
    <Button
      sx={{ height: 20, fontWeight: 200 }}
      aria-label="settings"
      variant="text"
      onClick={() => {
        props.onClick();
        setIsFollowing((isFollowing) => isFollowing);
      }}
    >
      {isFollowing ? null : "ℱᵒᒻᒻᵒ꒳"}
    </Button>
  );
};
