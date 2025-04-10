'use client';
import { PostsEntity } from '@/hooks/entities/posts.entities';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cluster } from 'radash';
import { useState } from 'react';

interface SearchFeedProps {
  post: PostsEntity[];
}

export const SearchFeed = ({ post }: SearchFeedProps) => {
  const imageGroups = cluster(post, 3);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSelect = (imageURL: string) => {
    setSelectedImage(imageURL);
    setImageDialogOpen(true);
  };

  const handleClose = () => {
    setImageDialogOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        gap={2}
        padding={2}
        marginBottom={isSmallScreen ? 40 : 15}
      >
        {imageGroups.map((group, groupIdx) =>
          group.map((post, idx) =>
            post.imageUrls.map((img, imgIdx) => (
              <Box
                key={`${groupIdx}-${idx}-${imgIdx}`}
                onClick={() => handleSelect(img)}
                sx={{
                  position: 'relative',
                  width: {
                    xs: '100%',
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
                  src={img}
                  alt="post image"
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
  );
};
