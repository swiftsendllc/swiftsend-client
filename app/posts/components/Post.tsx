'use client';

import { CommentInput } from '@/app/comment/components/CommentInput';
import { CommentStack } from '@/app/comment/components/CommentStack';
import { StyledBadge } from '@/components/SearchComponents';
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
import { Avatar, Box, Button, Chip, Collapse, IconButton, Stack, Tooltip, Typography } from '@mui/material';
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
    <Box
      sx={{
        width: '100%',
        minWidth:"400px",
        maxWidth:"640px",
        boxShadow: 3,
        borderRadius: 3,
        overflow: 'hidden',
        transition: '0.3s',
        '&:hover': { boxShadow: 6 },
        p: 2,
        mb: 3
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
        <Stack direction="row" spacing={2} alignItems="center">
          <StyledBadge isOnline={post.user.isOnline} overlap="circular" variant="dot">
            <Avatar src={post.user.avatarURL} alt={post.user.fullName} />
          </StyledBadge>
          <Box>
            <Typography
              fontWeight="bold"
              onClick={() => router.push(`/${post.user.username}`)}
              sx={{ cursor: 'pointer' }}
            >
              {post.user.fullName}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {moment(post.createdAt).fromNow()}
            </Typography>
          </Box>
        </Stack>
        <FollowButton isFollowing={isFollowing} onClick={() => handleFollow(post.userId)} />
      </Stack>

      <Box>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {isExpanded || post.caption.length <= 100 ? post.caption : `${post.caption.slice(0, 100)}...`}
          {post.caption.length > 100 && (
            <Button onClick={handleSee} size="small" sx={{ textTransform: 'none', ml: 1 }}>
              {isExpanded ? 'See less' : 'See more'}
            </Button>
          )}
        </Typography>
      </Box>

      {post._assets?.length > 0 && (
        <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', mb: 1, px: 5 }}>
          <Stack direction="row" spacing={0.5} sx={{ overflowX: 'auto', scrollSnapType: 'x mandatory' }}>
            {post._assets.map((url, idx) => (
              <Box
                key={idx}
                sx={{
                  minWidth: 430,
                  height: 400,
                  scrollSnapAlign: 'start',
                  position: 'relative',
                  borderRadius: 2
                }}
              >
                <Image
                  src={url.originalURL}
                  alt="post"
                  width={375}
                  height={300}
                  priority
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%'
                  }}
                />
              </Box>
            ))}
          </Stack>

          <Chip
            size="small"
            color="primary"
            label={`${post._assets.length} photo${post._assets.length > 1 ? 's' : ''}`}
            sx={{ position: 'absolute', top: 10, right: 10, backdropFilter: 'blur(10px)' }}
          />

          {!post.isPurchased && (
            <Chip
              icon={<MonetizationOnRoundedIcon />}
              label={`Unlock for $${post.price}`}
              onClick={() => {
                setSelectedPost(post);
                setPaymentModal(true);
              }}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                backdropFilter: 'blur(5px)',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            />
          )}
        </Box>
      )}

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 1 }}>
        <Typography variant="caption" color="textSecondary">
          {likeCount} likes • {commentCount} comments • {post.shareCount} shares
        </Typography>

        {!post.isMyPost && <SaveButton isSaved={isSaved} onClick={() => handleSave(post._id)} />}
      </Stack>

      <Box sx={{ borderTop: '1px solid', borderColor: 'divider', my: 1 }} />

      {post.isPurchased && (
        <Stack direction="row" justifyContent="space-around" py={1}>
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

          <Tooltip title="Info">
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      )}

      {post.comments && post.comments.length > 0 && (
        <Collapse in={true}>
          <Box px={1} pb={2}>
            {(isExpanded ? post.comments : post.comments.slice(-2)).map((comment, idx) => (
              <CommentStack key={idx} comment={comment} postId={post._id} onDelete={() => onMutation?.()} />
            ))}
            {post.comments.length > 2 && !isExpanded && (
              <Button onClick={handleSee} size="small" sx={{ textTransform: 'none', mt: 1 }}>
                View all comments
              </Button>
            )}
          </Box>
        </Collapse>
      )}

      {allowComments && (
        <Collapse in={allowComments}>
          <Box px={1} pb={2}>
            <CommentInput postId={post._id} onComment={() => onMutation?.()} />
          </Box>
        </Collapse>
      )}
    </Box>
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
