'use client';

import Transition from '@/components/Transition';
import usePostAPI from '@/hooks/api/usePostAPI';
import { UserContext } from '@/hooks/context/user-context';
import { PostsEntity } from '@/hooks/entities/posts.entities';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Fragment, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function PostInfoModal({
  isOpen,
  onClose,
  post
}: {
  isOpen: boolean;
  onClose?: () => unknown;
  post: PostsEntity;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const [user] = useContext(UserContext);
  const [didChange, setDidChange] = useState(false);
  const { editPost, deletePost } = usePostAPI();
  const [caption, setCaption] = useState(post.caption);

  useEffect(() => {
    setDidChange(caption !== post.caption);
  }, [caption]); //eslint-disable-line

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const handleOnChange = async (postId: string) => {
    setLoading(true);
    try {
      const data = await editPost({ caption }, { postId });
      setCaption(data.caption);
      handleClose();
      toast.success('EDITED');
    } catch (error) {
      console.log(error);
      toast.error('FAILED TO EDIT POST!');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deletePost(post._id);
      handleClose();
      router.push(`/${user.username}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        sx={{
          alignContent: 'center',
          alignItems: 'center',
          mb: 6
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="xs"
        fullWidth
        onClose={handleClose}
      >
        <Stack mt={2}>
          <Stack direction="row" alignContent="center" alignItems="center">
            <IconButton onClick={handleClose}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography alignContent="center" alignItems="center" variant="h6">
              Edit Post
            </Typography>
          </Stack>
          <Divider />
        </Stack>
        <Stack>
          <Card sx={{ padding: 0 }}>
            {post.imageUrls.map((img, idx) => (
              <Fragment key={idx}>
                <CardMedia
                  sx={{
                    objectFit: 'contain'
                  }}
                  component="img"
                  image={img}
                  title="green iguana"
                />
              </Fragment>
            ))}

            <CardContent>
              <TextField
                fullWidth
                id="standard-multiline-flexible"
                variant="standard"
                multiline
                maxRows={4}
                label="Edit your caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                focused
                autoFocus
              />
            </CardContent>
          </Card>

          <Divider />

          <Stack
            direction="row"
            spacing={1}
            sx={{
              mb: 1,
              justifyContent: 'center',
              alignContent: 'center',
              padding: 0
            }}
          >
            <Button
              variant="contained"
              fullWidth
              sx={{ width: '100%' }}
              style={{ color: 'var(--warning)' }}
              onClick={handleClose}
            >
              Discard
              <CloseIcon />
            </Button>
            <LoadingButton
              fullWidth
              sx={{ width: '100%' }}
              loading={loading}
              variant="contained"
              type="submit"
              disabled={!didChange || caption.trim() === ''}
              onClick={() => handleOnChange(post._id)}
            >
              Post
              <SendIcon />
            </LoadingButton>
          </Stack>
        </Stack>
      </Dialog>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="xs"
        sx={{
          alignContent: 'center',
          alignItems: 'center',
          mb: 6
        }}
      >
        <Stack mt={2}>
          <Stack direction="row" alignContent="center" alignItems="center">
            <IconButton onClick={handleClose}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography
              alignContent="center"
              alignItems="center"
              variant="subtitle2"
              color="var(--error)"
              fontWeight={200}
            >
              {' '}
              Are you sure you want to delete this journal?
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Card sx={{ padding: 0, margin: 0 }}>
          {post.imageUrls.map((img, idx) => (
            <Fragment key={idx}>
              <CardMedia
                sx={{
                  objectFit: 'contain'
                }}
                component="img"
                image={img}
                title="post title"
              />
            </Fragment>
          ))}
          <CardContent>
            <TextField fullWidth value={caption} variant="standard" label="Caption" disabled />
          </CardContent>
        </Card>
        <DialogActions>
          <LoadingButton
            loading={loading}
            sx={{ width: '100%' }}
            onClick={handleDelete}
            variant="contained"
            style={{ color: 'var(--error)' }}
          >
            <DeleteIcon />
            Yes
          </LoadingButton>
          <Button onClick={handleClose} variant="contained" color="primary" sx={{ width: '100%' }}>
            <TagFacesIcon />
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
