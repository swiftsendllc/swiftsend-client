"use client";

import { UserContext } from "@/hooks/user-context";
import AddIcon from "@mui/icons-material/Add";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  Fab,
  Stack,
  TextField,
} from "@mui/material";
import { useContext } from "react";

export default function MessagePage() {
  const [user] = useContext(UserContext);

  return (
    <>
      <Container maxWidth="xs" style={{padding:0}} sx={{ mb:5, mt: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignContent="center"
          alignItems="center"
        >
          <Avatar
            src={user.avatarURL}
            alt="Profile picture"
            sx={{ width: 40, height: 40 }}
          />

          <TextField
            sx={{ width: "60%" }}
            label="Search"
            slotProps={{
              input: {
                sx: { borderRadius: "10px" },
              },
            }}
          />

          <Fab
            sx={{ width: 40, height: 40 }}
            color="primary"
            aria-label="edit"
            variant="circular"
          >
            <NotificationsNoneOutlinedIcon />
          </Fab>
          <Fab
            sx={{ width: 40, height: 40 }}
            color="secondary"
            aria-label="edit"
            variant="circular"
          >
            <BookmarkBorderOutlinedIcon />
          </Fab>
        </Stack>
        <Divider sx={{ mt: 1 }} />
        <Card sx={{ mb: 0.5, width: "100%", p: 0, m: 0 }}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                src={user.avatarURL}
                alt={user.fullName}
              />
            }
            action={
              <Button
                sx={{ height: 20, fontWeight: 200 }}
                aria-label="settings"
                variant="text"
              >
                <AddIcon />
              </Button>
            }
            title={user.fullName}
          />
        </Card>
      </Container>
    </>
  );
}
