"use client";

import { CommentInput } from "@/app/comment/components/CommentInput";
import { CommentStack } from "@/app/comment/components/CommentStack";
import { StyledBadge } from "@/components/SearchComponents";
import TopBackNav from "@/components/TopBackNav";
import useAPI from "@/hooks/api/useAPI";
import usePostAPI from "@/hooks/api/usePostAPI";
import { UserContext } from "@/hooks/context/user-context";
import { PostsEntity } from "@/hooks/entities/posts.entities";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
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
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

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
  const [commentCount, setCommentCount] = useState(post.commentCount);
  const [user] = useContext(UserContext);
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const lastCommentRef = useRef<HTMLDivElement | null>(null);
  const [, setComments] = useState(post.comments);

  const handleSee = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    setCommentCount(post.commentCount);
  }, [post.commentCount]);

  useEffect(() => {
    setComments(post.comments);
  }, [post.comments]);

  const handleLike = debounce(async (postId: string) => {
    try {
      const post = (await likePost(postId)) as PostsEntity;
      setIsLiked(post.isLiked);
      setLikeCount(post.likeCount);
      toast.success("Liked");
    } catch (error) {
      console.log(error);
      toast.error("Failed to like post!");
    }
  }, 250);

  const handleSave = debounce(async (postId: string) => {
    try {
      const post = (await savePost(postId)) as PostsEntity;
      setIsSaved(post.isSaved);
      toast.success("Saved");
    } catch (error) {
      console.log(error);
      toast.error("Failed to save post!");
    }
  }, 250);

  const handleFollow = async (userId: string) => {
    try {
      const followUser = (await followProfile(userId)) as PostsEntity;
      setIsFollowing(followUser.isFollowing);
      toast.success(`Connected ${followUser}`);
    } catch (error) {
      console.log(error);
      toast.error("Failed to connect user!");
    }
  };

  useEffect(() => {
    if (lastCommentRef.current) {
      lastCommentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [post.comments]);

  return (
    <>
      {allowComments && <TopBackNav />}
      <Card key={post._id} sx={{ mb: 0.5, width: "100%", padding: 0, m: 0 }}>
        <CardHeader
          avatar={
            <>
              {post.user.isOnline ? (
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent
                  variant="dot"
                >
                  <Avatar
                    aria-label="recipe"
                    src={post.user.avatarURL}
                    alt={post.user.fullName}
                  />
                </StyledBadge>
              ) : (
                <Avatar
                  aria-label="recipe"
                  src={post.user.avatarURL}
                  alt={post.user.fullName}
                />
              )}
            </>
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
        <Typography variant="body2">
          {isExpanded && post.caption.length > 50
            ? post.caption
            : `${post.caption.slice(0, 50)}${
                post.caption.length > 0 ? "..." : ""
              }`}
          {post.caption.length > 50 && (
            <Button
              onClick={handleSee}
              variant="text"
              size="small"
              sx={{
                textTransform: "none",
                fontSize: "0.8rem",
                fontWeight: 500,
              }}
            >
              {isExpanded ? `See less` : `See more`}
            </Button>
          )}
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
            alt={post.caption || "Swiftsend image"}
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
              <Box>{` ${commentCount} 💬`}</Box>
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
              {post.comments.map((comment, idx) => (
                <CommentStack
                  onDelete={() => onMutation?.()}
                  key={idx}
                  comment={comment}
                  postId={post._id}
                />
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
      {isFollowing ? null : <PersonAddIcon />}
    </Button>
  );
};
