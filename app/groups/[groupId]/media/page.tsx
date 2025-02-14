"use client";

import useMessageAPI from "@/hooks/api/useMessageAPI";
import { GroupMessagesEntity } from "@/hooks/entities/messages.entities";
import { ArrowBack } from "@mui/icons-material";
import {
  Chip,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GroupMediaPage() {
  const { groupId } = useParams();
  const router = useRouter();
  const [contents, setContents] = useState<GroupMessagesEntity[]>([]);
  const { getGroupMedia } = useMessageAPI();

  const loadGroupMedia = async () => {
    const media = await getGroupMedia(groupId as string);
    setContents(media);
  };
  useEffect(() => {
    if (groupId) loadGroupMedia();
  }, [groupId]); //eslint-disable-line
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          py: 3,
          textAlign: "center",
          justifyContent: "flex-start",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Chip
            variant="outlined"
            icon={
              <IconButton onClick={() => router.back()}>
                <ArrowBack />
              </IconButton>
            }
          />
          <Typography
            color="#000000"
            align="center"
            sx={{ width: "100%" }}
            paddingRight={3}
          >
            GROUP MEDIA
          </Typography>
        </Stack>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Image Gallery
        </Typography>
        <Divider />
        <ImageList
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
          }}
          cols={3}
          rowHeight={125}
        >
          {contents.map((m, idx) => (
            <ImageListItem
              key={idx}
              sx={{ overflow: "hidden", borderRadius: 2, cursor: "pointer" }}
            >
              <Image
                src={m.imageURL}
                alt="Gallery image"
                width={125}
                height={125}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  transition: "transform 0.3s ease-in-out",
                }}
                priority
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </>
  );
}
