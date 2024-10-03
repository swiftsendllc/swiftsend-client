"use client";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import GestureIcon from "@mui/icons-material/Gesture";
import MenuIcon from "@mui/icons-material/Menu";

import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";

const stats = [
  {
    title: "Posts",
    count: 1,
  },
  {
    title: "Followers",
    count: 1,
  },
  {
    title: "Following",
    count: 1,
  },
];

export default function AccountPage() {
  return (
    <>
      <Box mt={{ md: 2, sm: 2 }} mb={2}>
        {/* Profile Header */}
        <Stack
          mt={5}
          mb={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" gap={0} width="50%">
            <Typography
              variant="h5"
              fontWeight={50}
              color="inherit"
              textAlign="left"
              sx={{
                display: "inline-block",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              arijitchhatui
            </Typography>
            <IconButton edge="end">
              <ExpandMoreOutlinedIcon />
            </IconButton>
          </Box>

          <Stack direction="row" spacing={1}>
            <IconButton color="inherit">
              <GestureIcon />
            </IconButton>
            <IconButton color="inherit">
              <AddBoxOutlinedIcon />
            </IconButton>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Box display="flex" alignItems="center">
          <Stack direction="column" spacing={2}>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="space-between"
              alignContent="center"
              alignItems="center"
            >
              <Avatar
                src="https://example.com/profile.jpg"
                alt="Profile Picture"
                sx={{ width: 80, height: 80 }}
              />

              <Stack direction="row" spacing={2}>
                {stats.map((item, idx) => (
                  <Stack
                    direction="column"
                    key={idx}
                    alignContent="center"
                    alignItems="center"
                  >
                    <Typography variant="h6">{item.count}</Typography>
                    <Typography variant="body2">{item.title}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>

            {/* Button to add vibe */}
            <Typography variant="h6" fontWeight={200}>
              Arijit Chhatui
            </Typography>
            <Typography variant="body2" fontWeight={300}>
              Exploring and enjoying. Creating cinematic events
            </Typography>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
