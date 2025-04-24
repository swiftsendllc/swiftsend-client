'use client';

import usePostAPI from '@/hooks/api/usePostAPI';
import { CreatorContext } from '@/hooks/context/creator-context';
import { PostsEntity } from '@/hooks/entities/posts.entities';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cluster } from 'radash';

import { useContext, useEffect, useState } from 'react';

export function AccountPostPage() {
  const { getCreatorPosts } = usePostAPI();
  const [posts, setPosts] = useState<PostsEntity[]>([]);
  const [creator] = useContext(CreatorContext);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageDialogOpen, setImageDialogOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const imageGroups = cluster(posts, 3);

  const loadPosts = async (userId: string) => {
    try {
      const posts = await getCreatorPosts(userId);
      setPosts(posts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = (imageURL: string) => {
    setSelectedImage(imageURL);
    setImageDialogOpen(true);
  };

  const handleClose = () => {
    setImageDialogOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    loadPosts(creator.userId);
  }, [creator.userId]); //eslint-disable-line

  return (
    <>
      <Box padding={0}>
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
          <>
            <Stack
              direction="row"
              flexWrap="wrap"
              justifyContent="center"
              gap={2}
              padding={2}
              marginBottom={isSmallScreen ? 10 : 15}
            >
              {imageGroups.map((group, groupIdx) =>
                group.map((posts, idx) =>
                  posts._assets.map((url, imgIdx) => (
                    <Box
                      key={`${groupIdx}-${idx}-${imgIdx}`}
                      onClick={() => handleSelect(url.originalURL)}
                      sx={{
                        position: 'relative',
                        width: {
                          xs: '30%',
                          sm: '48%',
                          md: '30%'
                        },
                        aspectRatio: '4 / 3',
                        borderRadius: 2,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        boxShadow: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: 4,
                          transform: 'scale(1.01)'
                        }
                      }}
                    >
                      <Image
                        src={url.originalURL}
                        alt="posts image"
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                        priority
                      />
                    </Box>
                  ))
                )
              )}
            </Stack>

            <Dialog open={imageDialogOpen} onClose={handleClose} maxWidth="md" fullWidth>
              <Box
                component={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: isSmallScreen ? '60vh' : '80vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'black'
                }}
              >
                <IconButton
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    zIndex: 10,
                    bgcolor: 'whitesmoke'
                  }}
                >
                  <CloseIcon />
                </IconButton>
                {selectedImage && (
                  <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
                    <Image
                      src={selectedImage}
                      alt="selected image"
                      fill
                      style={{ objectFit: 'contain' }}
                      sizes="100vw"
                      priority
                    />
                  </Box>
                )}
              </Box>
            </Dialog>
          </>
        )}
      </Box>
    </>
  );
}
