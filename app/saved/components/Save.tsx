"use client";

import usePostAPI from "@/hooks/api/usePostAPI";
import { UserContext } from "@/hooks/context/user-context";
import { PostsEntity } from "@/hooks/entities/posts.entities";
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
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export const SavePage = () => {
  const [saved, setSaved] = useState<PostsEntity[]>([]);
  const { getSaves } = usePostAPI();
  const router = useRouter();
  const [user] = useContext(UserContext);

  const loadSaves = async () => {
    try {
      const saved = await getSaves(user.userId);
      setSaved(saved);
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
        <IconButton onClick={() => router.back()}>
          <ArrowBackOutlinedIcon />
        </IconButton>
        <Typography fontWeight={200} color="primary">
          {" "}
          Saved
        </Typography>
        <IconButton>
          <MoreVertOutlinedIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Stack>
        {saved.length > 0 ? (
          <ImageList
            sx={{ width: "100%", height: "auto", margin: "0" }}
            cols={3}
            gap={4}
            rowHeight={125}
          >
            {saved.map((saved) => (
              <ImageListItem key={saved._id}>
                <Image
                  src={"kk"}
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
              </ImageListItem>
            ))}{" "}
          </ImageList>
        ) : (
          <Stack
            my="10"
            alignContent="center"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src="/svg-icons/sasuke1.svg"
              style={{
                objectFit: "cover",
                width: "50%",
                height: "50%",
              }}
              alt="image"
              width={300}
              height={100}
              priority
            />
            <Typography variant="h6" fontWeight="50">
             YOUR CONTENTS WILL APPEAR HERE
            </Typography>
          </Stack>
        )}
      </Stack>
    </>
  );
};
