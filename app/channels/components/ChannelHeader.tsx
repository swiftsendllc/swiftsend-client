import { UserProfilesEntity } from "@/hooks/entities/users.entities";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { Avatar, Fab, Stack, TextField } from "@mui/material";

export  function ChannelHeader({
  user,
}: {
  user: UserProfilesEntity;
}) {
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
        >
          <SettingsIcon />
        </Fab>
      </Stack>
    </>
  );
}
