"use client";
import { MessagesEntity } from "@/hooks/entities/messages.entities";
import { ImageListItem } from "@mui/material";
import Image from "next/image";

export default function ImageThumbnail({
  message,
}: {
  message: MessagesEntity;
}) {
  return (
    <ImageListItem>
      <Image
        width={100}
        height={100}
        src={message.imageURL}
        alt="IMAGE"
        priority
      />
    </ImageListItem>
  );
}
