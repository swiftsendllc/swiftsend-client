'use client';
import { PostsEntity } from '@/hooks/entities/posts.entities';
import { Dialog, ImageList, ImageListItem, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cluster } from 'radash';
import { Fragment, useState } from 'react';

const calculateRowCols = (idx: number, igx: number) => {
  return idx % 2 === 0 && (idx === 0 ? igx % 2 === 0 : true)
    ? 1
    : igx % 2 !== 0 && idx === 1
      ? 1
      : 2;
};

interface SearchFeedProps {
  post: PostsEntity[];
}

export const SearchFeed = ({ post }: SearchFeedProps) => {
  const imageGroups = cluster(post, 3);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleClick = (imageURL: string) => {
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
          sx={{ width: '100%', height: 'auto', margin: '0' }}
          cols={3}
          gap={4}
          rowHeight={125}
        >
          {imageGroups.map((images, igx) =>
            images.map((post, idx) => (
              <ImageListItem
                key={idx}
                rows={calculateRowCols(idx, igx)}
                cols={calculateRowCols(idx, igx)}
              >
                {post.imageUrls.map((img, idx) => (
                  <Fragment key={idx}>
                    <Image
                      onClick={() => handleClick(img)}
                      src={img}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%'
                      }}
                      alt={post.caption || 'image'}
                      width={400}
                      height={400}
                      priority
                    />
                  </Fragment>
                ))}
              </ImageListItem>
            ))
          )}
        </ImageList>
      </Stack>
      <Dialog open={imageDialogOpen} onClose={handleClose}>
        {selectedImage && (
          <motion.div>
            <Image
              onClick={() => handleClick(selectedImage)}
              src={selectedImage}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%'
              }}
              alt={selectedImage || 'image'}
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
