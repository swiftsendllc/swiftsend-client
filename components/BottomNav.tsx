"use client";

import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import PlayCircleSharpIcon from "@mui/icons-material/PlayCircleSharp";
import SearchIcon from "@mui/icons-material/Search";
import {
  Card,
  CardActionArea,
  Container,
  Icon,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

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
    value: "/post-",
    label: "Post",
    icon: <AddIcon />,
  },
  {
    value: "/reels",
    label: "Reels",
    icon: <PlayCircleSharpIcon />,
  },
  {
    value: "/account",
    label: "Account",
    icon: <AccountCircleSharpIcon />,
  },
];



export default function BottomNav() {
  const _pathName = usePathname();
  const { id } = useParams();

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
          {navigationItems.map((item, idx) => (
            <Card
              key={idx}
              sx={{
                backgroundColor: "transparent",
                boxShadow: "none",
              }}
            >
              <CardActionArea href={item.value} LinkComponent={Link}>
                <Stack
                  direction="column"
                  alignItems="center"
                  alignContent="center"
                  spacing={0}
                  p={1}
                >
                  <Icon color={pathName === item.value ? "primary" : "action"}>
                    {item.icon}
                  </Icon>
                  <Typography
                    variant="body2"
                    color={
                      pathName === item.value ? "primary" : "textSecondary"
                    }
                  >
                    {item.label}
                  </Typography>
                </Stack>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </Container>
    </Paper>
  );
}
