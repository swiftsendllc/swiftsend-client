'use client';

import usePostAPI from '@/hooks/api/usePostAPI';
import { PostsEntity } from '@/hooks/entities/posts.entities';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import {
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  Stack,
  Typography
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function LikePage() {
  const [posts, setPosts] = useState<PostsEntity[]>([]);
  const { getPostsLikedByYou } = usePostAPI();
  const router = useRouter();

  const loadLike = async () => {
    try {
      const post = await getPostsLikedByYou();
      setPosts(post);
    } catch (error) {
      console.log(error);
      toast.error('Failed to load likes!');
    }
  };

  useEffect(() => {
    loadLike();
  }, []); //eslint-disable-line
  return (
    <>
      <Stack direction="row" mt={2} justifyContent="space-between">
        <IconButton onClick={() => router.back()}>
          <ArrowBackOutlinedIcon />
        </IconButton>
        <Typography fontWeight={200} color="primary">
          {' '}
          Likes
        </Typography>
        <IconButton>
          <MoreVertOutlinedIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Stack>
        {posts.length > 0 ? (
          <ImageList
            sx={{ width: '100%', height: 'auto', margin: '0' }}
            cols={3}
            gap={4}
            rowHeight={125}
          >
            {posts.map((post) =>
              post.imageUrls.map((img, idx) => (
                <ImageListItem key={idx}>
                  <Image
                    src={img}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%'
                    }}
                    alt="image"
                    width={400}
                    height={400}
                    priority
                  />
                </ImageListItem>
              ))
            )}
          </ImageList>
        ) : (
          <Stack
            my="10"
            alignContent="center"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src="/svg/sasuke1.svg"
              style={{
                objectFit: 'cover',
                width: '50%',
                height: '50%'
              }}
              alt="image"
              width={300}
              height={100}
              priority
            />
            <Typography variant="h6" fontWeight="50">
              𝕿𝖍𝖎𝖘 𝖚𝖘𝖊𝖗 𝖍𝖆𝖘 𝖓𝖔 𝖎𝖒𝖆𝖌𝖊!!!!
            </Typography>
          </Stack>
        )}
      </Stack>
    </>
  );
}
