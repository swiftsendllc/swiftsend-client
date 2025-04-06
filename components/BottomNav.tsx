"use client";

import { UserContext } from "@/hooks/context/user-context";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PlayCircleSharpIcon from "@mui/icons-material/PlayCircleSharp";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Container,
  Icon,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useContext } from "react";

export default function BottomNav() {
  const _pathName = usePathname();
  const { id } = useParams();
  const [user] = useContext(UserContext);

  const navigationItems = [
    {
      value: "/home",
      label: "Home",
      icon: <HomeIcon />,
      hasBadge: false,
    },
    {
      value: "/search",
      label: "Search",
      icon: <SearchIcon />,
      hasBadge: false,
    },
    {
      value: "/channels",
      label: "Message",
      icon: <EmailIcon />,
      hasBadge: true,
    },
    {
      value: "/intro",
      label: "Intro",
      icon: <PlayCircleSharpIcon />,
      hasBadge: false,
    },
    {
      hasBadge: false,
      value: `/${user.username}`,
      label: "Account",
      icon: (
        <Image
          width="30"
          height="30"
          src={user.avatarURL!}
          alt="avatar"
          style={{ width: 20, height: 20 }}
        />
      ),
    },
  ];

  const pathName = _pathName === `/channels/${id}` ? `/channels/` : _pathName;

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: { sm: 65, md: 65 },
        display:{xs:"block", md:"none"}
      }}
    >
      <Container maxWidth="xs" style={{ padding: 0 }}>
        <Paper elevation={2}>
          <Stack direction="row" spacing={0.5} justifyContent="space-between">
            {navigationItems.map((option, idx) => (
              <Stack
                key={idx}
                sx={{
                  backgroundColor: "transparent",
                  boxShadow: "none",
                }}
              >
                <IconButton href={option.value} LinkComponent={Link}>
                  <Stack
                    direction="column"
                    alignItems="center"
                    alignContent="center"
                    spacing={0}
                    p={1}
                    m={0}
                  >
                    <Icon
                      color={pathName === option.value ? "primary" : "action"}
                    >
                      {option.icon}
                    </Icon>

                    <Typography
                      variant="body2"
                      color={
                        pathName === option.value ? "primary" : "textSecondary"
                      }
                      fontSize="0.65rem"
                      fontWeight={200}
                    >
                      {option.label}
                    </Typography>
                  </Stack>
                </IconButton>
              </Stack>
            ))}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
