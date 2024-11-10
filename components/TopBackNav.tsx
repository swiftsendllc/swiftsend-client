"use client";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Divider, IconButton, Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TopBackNav() {
  const router = useRouter();
  return (
    <>
      <Stack direction="row" mt={2} justifyContent="space-between">
        <IconButton onClick={() => router.back()} LinkComponent={Link}>
          <ArrowBackOutlinedIcon />
        </IconButton>
        <IconButton>
          <MoreVertOutlinedIcon />
        </IconButton>
      </Stack>
      <Divider />
    </>
  );
}
