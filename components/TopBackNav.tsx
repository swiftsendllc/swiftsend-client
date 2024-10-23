"use client";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Divider, IconButton, Stack } from "@mui/material";
import Link from "next/link";

export default function TopBackNav() {
  return (
    <>
      <Stack direction="row" mt={2} justifyContent='space-between'>
        <IconButton href="/home" LinkComponent={Link}>
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
