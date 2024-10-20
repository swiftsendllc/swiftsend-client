"use client";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Divider, IconButton, Stack } from "@mui/material";

export default function TopBackNav() {
  return (
    <>
      <Stack direction="row" mt={2} justifyContent='space-between'>
        <IconButton href="/home">
          <ArrowBackOutlinedIcon />
        </IconButton>
        <IconButton >
          <MoreVertOutlinedIcon />
        </IconButton>
      </Stack>
      <Divider />
    </>
  );
}
