"use client";
import { grid } from "@/components/SearchComponents";
import { UserContext } from "@/hooks/useContext";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import CameraAltSharpIcon from "@mui/icons-material/CameraAltSharp";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import GestureIcon from "@mui/icons-material/Gesture";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActionArea,
  Icon,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useContext } from "react";

export default function AccountPage() {
  const _pathName = usePathname();
  const [user] = useContext(UserContext);
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const maps = [ ...grid];
  const stats = [
    {
      title: "posts",
      count: user.postCount,
      label: "/followers",
    },
    {
      title: "followers",
      count: user.followerCount,
      label: "/followers",
    },
    {
      title: "following",
      count: user.followingCount,
      label: "/following",
    },
  ];

  const pathName = _pathName === `/accounts/${id}` ? "/accounts" : _pathName;
  return (
    <>
      <Box mt={{ md: 2, sm: 2 }} mb={2}>
        {/* Profile Header */}
        <Stack
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
              {user.username}
            </Typography>
            <IconButton edge="end">
              <ExpandMoreOutlinedIcon />
            </IconButton>
          </Box>

          <Stack direction="row" spacing={1}>
            {/* add link LinkComponent */}
            <IconButton color="inherit" href="/">
              <GestureIcon />
            </IconButton>
            <IconButton color="inherit" href="/">
              <AddBoxOutlinedIcon />
            </IconButton>
            <IconButton color="inherit" href="/account/settings" LinkComponent={Link}>
              <MenuIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Box display="flex" alignItems="center">
          <Stack direction="column" spacing={2} width="100%">
            <Stack
              direction="row"
              spacing={1}
              justifyContent="space-between"
              alignContent="center"
              alignItems="center"
            >
              {" "}
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={<AddSharpIcon />}
              >
                <Avatar
                  src={user.avatarURL!}
                  alt="Profile Picture"
                  sx={{ width: 80, height: 80 }}
                />
              </Badge>
              <Stack
                direction="row"
                spacing={4}
                justifyContent="flex-end"
                flexGrow={1}
              >
                {stats.map((item, idx) => (
                  <Stack
                    direction="column"
                    key={idx}
                    alignContent="center"
                    alignItems="center"
                  >
                    <Typography variant="h6" fontWeight={100}>
                      {item.count}
                    </Typography>
                    <Typography variant="body2" fontWeight={100}>
                      {item.title}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>

            {/* Button to add vibe */}
            <Typography variant="h6" fontWeight={200}>
              {user.fullName}
            </Typography>
            <Typography variant="body2" fontWeight={300}>
              {user.bio}
            </Typography>
            <Box>
              <IconButton>
                <AddCircleOutlineSharpIcon sx={{ width: 30, height: 30 }} />
              </IconButton>
            </Box>
            <Stack direction="row" spacing={0} justifyContent="space-between">
              <Button variant="outlined" href="/account/profile" LinkComponent={Link}>
                Profile{" "}
              </Button>
              <Button variant="outlined">Share </Button>
              <Button variant="outlined">Contact</Button>
              <Button variant="outlined">Dashboard</Button>
            </Stack>
            <Stack direction="row" spacing={1} justifyContent="space-between">
              {grid.map((item, idx) => (
                <Card
                  key={idx}
                  sx={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  }}
                >
                  <CardActionArea href={item.value} LinkComponent={Link}>
                    <Stack
                      alignItems="center"
                      alignContent="center"
                      spacing={0}
                      p={1}
                    >
                      <Icon
                        color={pathName === item.value ? "primary" : "action"}
                      >
                        {item.icon}
                      </Icon>
                    </Stack>
                  </CardActionArea>
                </Card>
              ))}
            </Stack>
            <Stack
              my="10"
              alignContent="center"
              alignItems="center"
              justifyContent="center"
            >
              <CameraAltSharpIcon sx={{ width: 60, height: 60 }} />
              <Typography variant="h5" fontWeight="100">
                Photos of yours {/*  needs to be fixed */}
              </Typography>
              <Typography variant="h6" fontWeight="50">
                Your photos, they&apos;ll appear here.{" "}
                {/*  needs to be fixed */}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
