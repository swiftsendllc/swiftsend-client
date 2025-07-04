'use client';

import { CommentInput } from '@/app/comment/components/CommentInput';
import { CommentStack } from '@/app/comment/components/CommentStack';
import { StyledBadge } from '@/components/SearchComponents';
import TopBackNav from '@/components/TopBackNav';
import useAPI from '@/hooks/api/useAPI';
import usePostAPI from '@/hooks/api/usePostAPI';
import { PostsEntity } from '@/hooks/entities/posts.entities';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface PostProps {
  post: PostsEntity;
  allowComments?: boolean;
  onMutation?: () => unknown;
  setPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<PostsEntity | null>>;
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

export const PostCard = ({ post, allowComments = false, onMutation, setPaymentModal, setSelectedPost }: PostProps) => {
  const { followProfile } = useAPI();
  const { likePost, savePost } = usePostAPI();
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [isFollowing, setIsFollowing] = useState(post.isFollowing);
  const [commentCount, setCommentCount] = useState(post.commentCount);
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const lastCommentRef = useRef<HTMLDivElement | null>(null);
  const [, setComments] = useState(post.comments);

  const handleSee = () => setIsExpanded((prev) => !prev);

  useEffect(() => setCommentCount(post.commentCount), [post.commentCount]);
  useEffect(() => setComments(post.comments), [post.comments]);

  const handleLike = async (postId: string) => {
    try {
      const post = await likePost(postId);
      setIsLiked(post.isLiked);
      setLikeCount(post.likeCount);
      if (!isLiked) toast.success('LIKED');
    } catch {
      toast.error('FAILED TO LIKE!');
    }
  };

  const handleSave = async (postId: string) => {
    try {
      const post = await savePost(postId);
      setIsSaved(post.isSaved);
      if (!isSaved) toast.success('SAVED');
    } catch {
      toast.error('FAILED TO SAVE POST!');
    }
  };

  const handleFollow = async (userId: string) => {
    try {
      const followedUser = await followProfile(userId);
      setIsFollowing(followedUser.isFollowing);
      toast.success('CONNECTED');
    } catch {
      toast.error('FAILED TO FOLLOW!');
    }
  };

  useEffect(() => {
    if (lastCommentRef.current) {
      lastCommentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [post.comments]);

  return (
    <>
      {allowComments && <TopBackNav />}
      <Card sx={{ mb: 2, width: '100%', transition: '0.3s', '&:hover': { transform: 'scale(1.005)', boxShadow: 4 } }}>
        <CardHeader
          avatar={
            <StyledBadge isOnline={post.user.isOnline} overlap="circular" variant="dot">
              <Avatar src={post.user.avatarURL} alt={post.user.fullName} />
            </StyledBadge>
          }
          action={<FollowButton isFollowing={isFollowing} onClick={() => handleFollow(post.userId)} />}
          title={
            <Tooltip title={`@${post.user.username}`}>
              <IconButton onClick={() => router.push(`/${post.user.username}`)}>
                <Typography fontWeight="bold">{post.user.fullName}</Typography>
              </IconButton>
            </Tooltip>
          }
          subheader={moment(post.createdAt).format('LLL')}
        />
        <Typography px={2} variant="body2">
          {isExpanded || post.caption.length <= 50 ? post.caption : `${post.caption.slice(0, 50)}...`}
          {post.caption.length > 50 && (
            <Button onClick={handleSee} size="small" sx={{ textTransform: 'none' }}>
              {isExpanded ? 'See less' : 'See more'}
            </Button>
          )}
        </Typography>
        <Box position="relative">
          <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', scrollSnapType: 'x mandatory' }}>
            {post._assets?.map((url, idx) => (
              <Box
                key={idx}
                sx={{ minWidth: 375, height: 300, scrollSnapAlign: 'center', borderRadius: 2, overflow: 'hidden' }}
              >
                <Image src={url.originalURL} alt="image" width={375} height={300} style={{ objectFit: 'cover' }} />
              </Box>
            ))}
          </Stack>
          <Box position="absolute" top={8} right={8}>
            <Chip color="primary" label={post._assets?.length} />
          </Box>
          {!post.isPurchased && (
            <Box position="absolute" top={120} left={90}>
              <Chip
                label={`Purchase exclusive post at $${post.price}`}
                icon={<MonetizationOnRoundedIcon />}
                onClick={() => {
                  setSelectedPost(post);
                  setPaymentModal(true);
                }}
                sx={{ backdropFilter: 'blur(10px)', background: 'rgba(0,0,0,0.6)', color: '#fff' }}
              />
            </Box>
          )}
          <Box position="absolute" bottom={8} right={8}>
            {!post.isMyPost && <SaveButton isSaved={isSaved} onClick={() => handleSave(post._id)} />}
          </Box>
        </Box>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Box>{`${likeCount} ❤`}</Box>
            <Stack direction="row" spacing={1}>
              <Box>{`${commentCount} 💬`}</Box>
              <Box>{`${post.shareCount} ➦`}</Box>
            </Stack>
          </Stack>
        </CardContent>
        <Divider />
        {post.isPurchased && (
          <Stack direction={"row"} justifyContent="space-between" px={2}>
            <LikeButton isLiked={isLiked} onClick={() => handleLike(post._id)} />
            <Tooltip title="Comments">
              <IconButton href={`/posts/${post._id}`} LinkComponent={Link}>
                <ModeCommentOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share">
              <IconButton>
                <SendOutlinedIcon />
              </IconButton>
            </Tooltip>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Stack>
        )}
        {post.comments && post.comments?.length > 0 && (
          <Collapse in={true}>
            <Box display="flex" flexDirection="column" px={1} py={2}>
              {(isExpanded ? post.comments : post.comments.slice(-2)).map((comment, idx) => (
                <CommentStack key={idx} comment={comment} postId={post._id} onDelete={() => onMutation?.()} />
              ))}
              {post.comments.length > 2 && !isExpanded && (
                <Button onClick={handleSee} size="small" sx={{ alignSelf: 'start' }}>
                  View all comments
                </Button>
              )}
            </Box>
          </Collapse>
        )}
      </Card>
      {allowComments && (
        <Collapse in={allowComments}>
          <Box px={1}>
            <CommentInput postId={post._id} onComment={() => onMutation?.()} />
          </Box>
        </Collapse>
      )}
    </>
  );
};

const LikeButton = ({ onClick, isLiked }: LikeButtonProps) => {
  const [liked, setLiked] = useState(isLiked);
  useEffect(() => setLiked(isLiked), [isLiked]);

  return (
    <Tooltip title="Like">
      <IconButton
        onClick={() => {
          onClick();
          setLiked(!liked);
        }}
        sx={liked ? { animation: 'bounce 0.3s ease' } : {}}
      >
        {liked ? <ThumbUpIcon color="error" /> : <ThumbUpOutlinedIcon color="primary" />}
      </IconButton>
    </Tooltip>
  );
};

const SaveButton = ({ onClick, isSaved }: SaveButtonProps) => {
  const [saved, setSaved] = useState(isSaved);
  useEffect(() => setSaved(isSaved), [isSaved]);

  return (
    <Tooltip title="Save">
      <IconButton
        onClick={() => {
          onClick();
          setSaved(!saved);
        }}
      >
        {saved ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon color="error" />}
      </IconButton>
    </Tooltip>
  );
};

const FollowButton = ({ onClick, isFollowing }: FollowButtonProps) => {
  const [following, setFollowing] = useState(isFollowing);
  useEffect(() => setFollowing(isFollowing), [isFollowing]);

  return (
    <Button
      variant="text"
      size="small"
      onClick={() => {
        onClick();
        setFollowing(following);
      }}
      sx={{ minWidth: 0 }}
    >
      {following ? null : <PersonAddIcon />}
    </Button>
  );
};
