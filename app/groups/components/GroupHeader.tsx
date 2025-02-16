"use client";

import { UserProfilesEntity } from "@/hooks/entities/users.entities";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { Avatar, Fab, Stack, TextField } from "@mui/material";
import { useState } from "react";
import GroupCreateModal from "./GroupCreateModal";

export default function GroupHeader({
  user,
}: {
  user: UserProfilesEntity;
}) {
  const [groupCreateModal, setGroupCreateModal] = useState<boolean>(false);

  return (
    <>
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
          onClick={() => {
            setGroupCreateModal(true);
          }}
        >
          <SettingsIcon />
        </Fab>
        <GroupCreateModal
          isOpen={groupCreateModal}
          onClose={() => setGroupCreateModal(false)}
        />
      </Stack>
    </>
  );
}
