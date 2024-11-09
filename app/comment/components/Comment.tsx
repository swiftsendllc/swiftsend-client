"use client";

import { postSamples } from "@/components/SearchComponents";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

export function CommentPage() {
  const router = useRouter();

  return (
    <>
      <Stack direction="row" justifyContent="space-between" mt={2}>
        <IconButton onClick={() => router.back()}>
          <ArrowBackOutlinedIcon />
        </IconButton>
        <Typography fontWeight={200} color="primary">
          Comment
        </Typography>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Stack
        direction="row"
        spacing={2}
        overflow="auto"
        alignItems="center"
        sx={{ overflowX: "auto", whiteSpace: "nowrap" }}
      >
        {postSamples.map((post, idx) => (
          <Fragment key={idx}>
            <Box
              height="100%"
              width="100%"
              display="flex"
              justifyContent="center"
              sx={{
              transform: `rotate(30deg)`, // Slight rotation effect
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: `rotate(30deg) scale(1.05)`, // Slightly enlarges and straightens on hover
              },
            }}
            >
              <Image
                src={post.imageURL}
                style={{
                  objectFit: "contain",
                  borderRadius: "16px",
                  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
                }}
                alt={post.title}
                width={400}
                height={400}
                priority
              />
            </Box>
          </Fragment>
        ))}
      </Stack>
    </>
  );
}
