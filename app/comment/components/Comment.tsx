'use client';

import usePostAPI from '@/hooks/api/usePostAPI';
import { CommentsEntity } from '@/hooks/entities/posts.entities';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PreviewIcon from '@mui/icons-material/Preview';

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function CommentPage() {
  const router = useRouter();
  const [comments, setComments] = useState<CommentsEntity[]>([]);
  const [, setSelectedComment] = useState<CommentsEntity | null>(null);
  const { getCommentsCreatedByYou, deleteComment } = usePostAPI();

  const loadComment = async () => {
    try {
      const comment = await getCommentsCreatedByYou();
      setComments(comment);
    } catch (error) {
      console.log(error);
      toast.error('Failed to load comments!');
    }
  };

  const handleDelete = async (postId: string, commentId: string) => {
    try {
      await deleteComment(postId, commentId);
      toast.success('This comment is deleted');
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete comment');
    }
  };

  useEffect(() => {
    loadComment();
  }, []); //eslint-disable-line

  return (
    <>
      <Stack direction="row" justifyContent="space-between" mt={2}>
        <IconButton onClick={() => router.back()}>
          <ArrowBackOutlinedIcon />
        </IconButton>
        <Typography fontWeight={200} color="primary">
          Comment
        </Typography>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Stack direction="column" spacing={0.5}>
        {comments.map((comment, idx) => (
          <Card
            key={idx}
            sx={{ mb: 0.5, width: '100%', p: 0, m: 0, borderRadius: '15px' }}
            onClick={() => setSelectedComment(comment)}
          >
            <CardHeader
              avatar={
                <>
                  <Avatar
                    aria-label="recipe"
                    src={comment.user.avatarURL}
                    alt={comment.user.fullName}
                  />
                </>
              }
              title={comment.user.fullName}
              subheader={comment.createdAt}
              action={
                <>
                  <IconButton
                    onClick={() => {
                      router.push(`/posts/${comment.postId}`);
                    }}
                  >
                    <PreviewIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(comment.postId, comment._id)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </>
              }
            />
            <CardContent>
              <Typography fontWeight={300}>{comment.comment}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </>
  );
}
