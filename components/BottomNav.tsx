"use client";

import { UserContext } from "@/hooks/useContext";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PlayCircleSharpIcon from "@mui/icons-material/PlayCircleSharp";
import SearchIcon from "@mui/icons-material/Search";
import {
  IconButton,
  Container,
  Icon,
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
    },
    {
      value: "/search",
      label: "Search",
      icon: <SearchIcon />,
    },
    {
      value: "/messages",
      label: "Message",
      icon: <EmailIcon />,
    },
    {
      value: "/reels",
      label: "Intro",
      icon: <PlayCircleSharpIcon />,
    },
    {
      value: "/account",
      label: "Account",
      icon: (
        <Image
          width="30"
          height="30"
          src={user.avatarURL!}
          alt="avatar"
          style={{ width: 30, height: 30, borderRadius: "50%" }}
        />
      ),
    },
  ];

  const pathName = _pathName === `/groups/${id}` ? "/groups" : _pathName;

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: { sm: 65, md: 65 },
      }}
      elevation={2}
    >
      <Container maxWidth="xs" style={{ padding: 0 }}>
        <Stack direction="row" spacing={1} justifyContent="space-between">
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
                  >
                    {option.label}
                  </Typography>
                </Stack>
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Paper>
  );
}
