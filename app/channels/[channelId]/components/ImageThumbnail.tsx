import { MessagesEntity } from '@/hooks/entities/messages.entities';
import { Box, ImageListItem } from '@mui/material';
import Image from 'next/image';

export function ImageThumbnail({ message }: { message: MessagesEntity }) {
  return (
    <ImageListItem
      style={{
        display: 'flex-end',
        maxHeight: 100,
        maxWidth: 100,
        overflowX: 'hidden',
        overflowY: 'auto',
        justifyContent: 'space-between'
      }}
    >
      {message.imageUrls.map((image, idx) => (
        <Box key={idx}>
          <Image width={100} height={100} src={image} alt="IMAGE" priority />
        </Box>
      ))}
    </ImageListItem>
  );
}
