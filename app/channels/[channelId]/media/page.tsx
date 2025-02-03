"use client";

import useMessageAPI from "@/hooks/api/useMessageAPI";
import { MessagesEntity } from "@/hooks/entities/messages.entities";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import {
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MessageMediaPage() {
  const [images, setImages] = useState<MessagesEntity[]>([]);
  const { getChannelMedia } = useMessageAPI();
  const { channelId } = useParams();
  const router = useRouter();
  const loadChannelMedia = async () => {
    const media = await getChannelMedia(channelId as string);
    setImages(media);
  };

  useEffect(() => {
    if (channelId) loadChannelMedia();
  }, [channelId]); //eslint-disable-line

  return (
    <>
      <Stack direction="row" mt={2} justifyContent="space-between">
        <IconButton onClick={() => router.back()}>
          <ArrowBackOutlinedIcon />
        </IconButton>
        <Typography fontWeight={200} color="primary">
          {" "}
          Media
        </Typography>
        <IconButton>
          <MoreVertOutlinedIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Stack>
        <ImageList
          sx={{ width: "100%", height: "auto", margin: "0" }}
          cols={3}
          gap={4}
          rowHeight={125}
        >
          {images.map((image, idx) => (
            <ImageListItem key={idx}>
              {image.imageURL.length > 0 ? (
                <Image
                  src={image.imageURL}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                  alt="image"
                  width={400}
                  height={400}
                  priority
                />
              ) : (
                <Typography variant="h6" fontWeight="50">
                  Your media will appear here
                </Typography>
              )}
            </ImageListItem>
          ))}
        </ImageList>
      </Stack>
    </>
  );
}
