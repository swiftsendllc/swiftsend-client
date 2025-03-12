'use client';

import usePostAPI from '@/hooks/api/usePostAPI';
import { PostsEntity } from '@/hooks/entities/posts.entities';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Divider, IconButton, ImageList, ImageListItem, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

export default function SavePage() {
  const [posts, setPosts] = useState<PostsEntity[]>([]);
  const { getSavedPosts } = usePostAPI();
  const router = useRouter();

  const loadSaves = async () => {
    try {
      const posts = await getSavedPosts();
      setPosts(posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadSaves();
  }, []); //eslint-disable-line

  return (
    <>
      <Stack direction="row" mt={2} justifyContent="space-between">
        <IconButton onClick={() => router.back()}>
          <ArrowBackOutlinedIcon />
        </IconButton>
        <Typography fontWeight={200} color="primary">
          {' '}
          Vault
        </Typography>
        <IconButton>
          <MoreVertOutlinedIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Stack>
        {posts.length > 0 ? (
          <ImageList sx={{ width: '100%', height: 'auto', margin: '0' }} cols={3} gap={4} rowHeight={125}>
            {posts.map((post) => (
              <ImageListItem key={post._id}>
                {post.imageUrls.map((img, idx) => {
                  return (
                    <Fragment key={idx}>
                      <Image
                        src={img}
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%'
                        }}
                        alt={'img'}
                        width={400}
                        height={400}
                        priority
                        onClick={() => router.push(`/posts/${post._id}`)}
                      />
                    </Fragment>
                  );
                })}
              </ImageListItem>
            ))}{' '}
          </ImageList>
        ) : (
          <Stack my="10" alignContent="center" alignItems="center" justifyContent="center">
            <Image
              src="/svg-icons/sasuke1.svg"
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
              YOUR CONTENTS WILL APPEAR HERE
            </Typography>
          </Stack>
        )}
      </Stack>
    </>
  );
}
