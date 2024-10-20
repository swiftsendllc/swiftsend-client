"use client";

import { top100Films } from "@/components/SearchComponents";
import { UserContext } from "@/hooks/useContext";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import {
  Autocomplete,
  Avatar,
  Container,
  Divider,
  Fab,
  Stack,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";

export default function MessagePage() {
  const [user] =useContext(UserContext)
  const [query, setQuery] = useState("")
  return (
    <>
      <Container sx={{ p: 0, mt: 2 }}>
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
          <Autocomplete
            freeSolo
            disablePortal
            onInputChange={(_, value) => {
              setQuery(value);
            }}
            sx={{ width: "60%" }}
            open={Boolean(query)}
            options={top100Films.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
                slotProps={{
                  input: {
                    ...params.InputProps,
                    sx: { borderRadius: "10px" },
                  },
                }}
              />
            )}
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
      </Container>
    </>
  );
}
