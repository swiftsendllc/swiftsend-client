'use client';
import { PostsEntity } from '@/hooks/entities/posts.entities';
import { Box, Chip, Dialog, ImageList, ImageListItem, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cluster } from 'radash';
import { useState } from 'react';

const calculateRowCols = (idx: number, igx: number) => {
  return idx % 2 === 0 && (idx === 0 ? igx % 2 === 0 : true) ? 1 : igx % 2 !== 0 && idx === 1 ? 1 : 2;
};

interface SearchFeedProps {
  post: PostsEntity[];
}

export const SearchFeed = ({ post }: SearchFeedProps) => {
  const imageGroups = cluster(post, 3);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
      <Stack>
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
          {imageGroups.map((images, igx) =>
            images.map((post, idx) => (
              <ImageListItem key={idx} rows={calculateRowCols(idx, igx)} cols={calculateRowCols(idx, igx)}>
                {post.imageUrls.length < 2 ? (
                  post.imageUrls.map((img, imgIdx) => (
                    <Image
                      key={imgIdx}
                      onClick={() => handleSelect(img)}
                      src={img}
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
                            onClick={() => handleSelect(img)}
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
            ))
          )}
        </ImageList>
      </Stack>
      <Dialog open={imageDialogOpen} onClose={handleClose}>
        {selectedImage && (
          <motion.div>
            <Image
              onClick={() => handleSelect(selectedImage)}
              src={selectedImage}
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
          </motion.div>
        )}
      </Dialog>
    </>
  );
};
