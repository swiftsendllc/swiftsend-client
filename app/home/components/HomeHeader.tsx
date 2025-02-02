"use client";

import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import { Fab, Stack, Typography } from "@mui/material";

export const HomeHeaderPage = () => {
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignContent="center"
        alignItems="center"
      >
        <Typography variant="h5">swiftsend</Typography>
        <Stack direction="row" justifyContent="space-between" gap={4}>
          <Fab
            sx={{ width: 40, height: 40 }}
            color="primary"
            aria-label="edit"
            variant="circular"
          >
            <EditIcon />
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
      </Stack>
    </>
  );
};
