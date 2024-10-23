"use client";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { PostsEntity } from "@/hooks/types";
import useAPI from "@/hooks/useAPI";
import {
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SavePage() {
  const [saved, setSaved] = useState<PostsEntity[]>([]);
  const { getSaves } = useAPI();

  const loadSaves = async () => {
    try {
      const saves = await getSaves();
      setSaved(saves);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadSaves();
  }, []); //eslint-disable-line

  return (
    <>
      <Stack direction="row" mt={2} justifyContent="space-between">
        <IconButton href="/posts" LinkComponent={Link}>
          <ArrowBackOutlinedIcon />
        </IconButton>
        <Typography fontWeight={200} color="primary">
          {" "}
          Saves
        </Typography>
        <IconButton>
          <MoreVertOutlinedIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Stack>
        {saved && saved.length > 0 && (
          <ImageList
            sx={{ width: "100%", height: "auto", margin: "0" }}
            cols={3}
            gap={4}
            rowHeight={125}
          >
            {saved.map((save) => (
              <ImageListItem key={save._id}>
                <Image
                  src={save.imageURL}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                  alt="image"
                  width={400}
                  height={400}
                  priority
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Stack>
    </>
  );
}
