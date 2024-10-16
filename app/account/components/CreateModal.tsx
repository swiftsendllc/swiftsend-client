import Transition from "@/components/Transition";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import GridOnSharpIcon from "@mui/icons-material/GridOnSharp";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import MovieSharpIcon from "@mui/icons-material/MovieSharp";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import UpdateIcon from "@mui/icons-material/Update";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";

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

const create = [
  {
    label: "Post",
    icon: <GridOnSharpIcon sx={{ width: 30, height: 30 }} />,
  },
  {
    label: "Reel",
    icon: <MovieSharpIcon sx={{ width: 30, height: 30 }} />,
  },
  {
    label: "Story",
    icon: <HistoryToggleOffIcon sx={{ width: 30, height: 30 }} />,
  },
  {
    label: "Story highlight",
    icon: <UpdateIcon sx={{ width: 30, height: 30 }} />,
  },
  {
    label: "Subscribe",
    icon: <ShoppingBasketIcon sx={{ width: 30, height: 30 }} />,
  },
];

export default function CreateModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose?: () => unknown;
}) {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const [loading, setLoading] = useState(false);

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
              <>
                <ListItemButton
                  key={idx}
                  sx={{ padding: 0, py: 1, borderRadius: 2 }}
                  href="/account/preview"
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
              </>
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
          <LoadingButton loading={loading}></LoadingButton>
        </FormControl>
      </Dialog>
    </>
  );
}
