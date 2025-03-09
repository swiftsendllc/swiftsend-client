'use client';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import { ImageListItem } from '@mui/material';
import Image from 'next/image';
import { Fragment } from 'react';

export default function ImageThumbnail({
  message
}: {
  message: MessagesEntity;
}) {
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
        <Fragment key={idx}>
          <Image width={100} height={100} src={image} alt="IMAGE" priority />
        </Fragment>
      ))}
    </ImageListItem>
  );
}
