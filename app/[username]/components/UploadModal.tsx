import Transition from "@/components/Transition";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import React, { useEffect, useState } from "react";

import { create } from "@/components/SearchComponents";
import {
  Dialog,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function UploadModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose?: () => unknown;
}) {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="xs"
        PaperProps={{
          style: {
            margin: 0,
            width: "100%",
          },
        }}
        onClose={handleClose}
      >
        <FormControl
          variant="standard"
          fullWidth
          component="form"
          sx={{ margin: 0, padding: 0, mb: 0 }}
        >
          <DialogTitle textAlign="center">Create</DialogTitle>
          <Divider />
          <List sx={{ width: "100%", padding: 0, mb: 0 }}>
            {create.map((option, idx) => (
              <React.Fragment key={idx}>
                <ListItemButton
                  key={idx}
                  sx={{ padding: 0, py: 1, borderRadius: 2 }}
                  href="/posts"
                  LinkComponent={Link}
                >
                  <ListItemIcon sx={{ pr: 1, minWidth: 35 }}>
                    {option.icon}
                  </ListItemIcon>
                  {option.icon ? (
                    <ListItemText disableTypography>
                      <Stack
                        direction="column"
                        alignContent=""
                        alignItems="left"
                      >
                        <Typography variant="h6" fontWeight={200}>
                          {option.label}
                        </Typography>
                      </Stack>
                    </ListItemText>
                  ) : (
                    <ListItemText primary={option.label} />
                  )}
                </ListItemButton>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <IconButton
            sx={{
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <AcUnitIcon sx={{ width: 30, height: 30 }} />
          </IconButton>
        </FormControl>
      </Dialog>
    </>
  );
}
