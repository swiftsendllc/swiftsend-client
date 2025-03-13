'use client';

import usePostAPI from '@/hooks/api/usePostAPI';
import { PostsEntity } from '@/hooks/entities/posts.entities';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Box, Chip, Divider, IconButton, ImageList, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
        {posts.map((post, idx) => (
          <Box sx={{ position: 'relative' }} key={idx}>
            {post.imageUrls.length === 1 ? (
              post.imageUrls.map((img, igx) => (
                <Stack key={igx} mb={1}>
                  <ImageList component="div" cols={3} rowHeight={164}>
                    <Image
                      style={{
                        minWidth: 122,
                        minHeight: 122,
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                      priority
                      src={img}
                      alt={'image'}
                      width={122}
                      height={122}
                    />
                  </ImageList>
                </Stack>
              ))
            ) : (
              <Stack
                direction={'row'}
                spacing={1}
                flexWrap={'nowrap'}
                sx={{
                  whiteSpace: 'nowrap',
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  minHeight: 122,
                  minWidth: 122
                }}
              >
                {post.imageUrls.map((img, idx) => (
                  <Box key={idx} position={'relative'}>
                    <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                      <Chip color="primary" label={post.imageUrls.length} variant="filled" />
                    </Box>
                    <Image
                      style={{
                        minWidth: 122,
                        minHeight: 122,
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                      priority
                      src={img}
                      alt={'image'}
                      width={122}
                      height={122}
                    />
                  </Box>
                ))}
              </Stack>
            )}
          </Box>
        ))}

        {posts.length === 0 && (
          <Stack my="10" alignContent="center" alignItems="center" justifyContent="center">
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
              YOUR CONTENTS WILL APPEAR HERE
            </Typography>
          </Stack>
        )}
      </Stack>
    </>
  );
}
