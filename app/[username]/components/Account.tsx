'use client';

import PostInfoModal from '@/app/posts/components/PostInfoModal';
import usePostAPI from '@/hooks/api/usePostAPI';
import { CreatorContext } from '@/hooks/context/creator-context';
import { PostsEntity } from '@/hooks/entities/posts.entities';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Chip, ImageList, ImageListItem, Stack, Typography } from '@mui/material';
import Image from 'next/image';

import { useContext, useEffect, useState } from 'react';

export default function AccountPostPage() {
  const { getCreatorPosts } = usePostAPI();
  const [posts, setPosts] = useState<PostsEntity[]>([]);
  const [editPostModal, setEditPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostsEntity | null>(null);
  const [creator] = useContext(CreatorContext);

  const loadPosts = async (userId: string) => {
    try {
      const posts = await getCreatorPosts(userId);
      setPosts(posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadPosts(creator.userId);
  }, [creator.userId]); //eslint-disable-line

  return (
    <>
      <Box mb={6}>
        {posts.length === 0 ? (
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
              This user has no image
            </Typography>
          </Stack>
        ) : (
          <ImageList
            sx={{
              width: '100%',
              height: 'auto',
              margin: '0'
            }}
            cols={3}
            gap={4}
            rowHeight={125}
          >
            {posts.map((post, idx) => (
              <ImageListItem key={idx}>
                <Box onClick={() => setSelectedPost(post)} position={'absolute'} top={2} right={2}>
                  <MoreVertIcon />
                </Box>
                {post.imageUrls.length < 2 ? (
                  post.imageUrls.map((img, imgIdx) => (
                    <Image
                      key={imgIdx}
                      src={img}
                      onClick={() => setSelectedPost(post)}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%'
                      }}
                      alt={'image'}
                      width={400}
                      height={400}
                      priority
                    />
                  ))
                ) : (
                  <Stack
                    direction={'row'}
                    spacing={0}
                    flexWrap={'nowrap'}
                    sx={{
                      whiteSpace: 'nowrap',
                      overflowX: 'auto',
                      overflowY: 'hidden',
                      minHeight: 254,
                      minWidth: 248
                    }}
                  >
                    {post.imageUrls.map((img, imgIdx) => (
                      <Box key={imgIdx}>
                        <Box position={'absolute'} sx={{ top: 8, right: 8 }} p={0} m={0} zIndex={100}>
                          <Chip label={post.imageUrls.length} color="info" variant="outlined" />
                        </Box>
                        <Box position={'relative'}>
                          <Image
                            src={img}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              minHeight: 254,
                              minWidth: 248,
                              marginRight: 2
                            }}
                            alt={'image'}
                            width={400}
                            height={400}
                            priority
                          />
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                )}
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>
      {selectedPost && (
        <PostInfoModal post={selectedPost} isOpen={editPostModal} onClose={() => setEditPostModal(false)} />
      )}
    </>
  );
}
