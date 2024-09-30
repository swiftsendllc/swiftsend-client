import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import PlayCircleSharpIcon from "@mui/icons-material/PlayCircleSharp";
import SearchIcon from "@mui/icons-material/Search";
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Paper,
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
    value: "/post",
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
        <BottomNavigation showLabels value={pathName}>
          {navigationItems.map((item, idx) => (
            <BottomNavigationAction
              key={idx}
              value={item.value}
              label={item.label}
              href={item.value}
              LinkComponent={Link}
              icon={item.icon}
            />
          ))}
        </BottomNavigation>
      </Container>
    </Paper>
  );
}
