"use client";

import Transition from "@/components/Transition";
import useAPI from "@/hooks/api/useAPI";
import { CreatorContext } from "@/hooks/context/creator-context";
import { UserProfilesEntity } from "@/hooks/types";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function ConnectedModal({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose?: () => unknown;
  user: UserProfilesEntity;
}) {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const router = useRouter();
  const { unFollowProfile } = useAPI();
  const [loading, setLoading] = useState(false);
  const [creator] = useContext(CreatorContext);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const handleUnFollow = async () => {
    setLoading(true);
    try {
      await unFollowProfile(user.userId);
      handleClose();
      router.push(`/${creator.username}/connected`);
    } finally {
      setLoading(false);
    }
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
          fullWidth
          component="form"
          variant="standard"
          sx={{ margin: 0, padding: 0 }}
        >
          <DialogTitle sx={{ pb: 0 }} variant="subtitle1" fontWeight={200}>
            We are sad to see you go!
          </DialogTitle>
          <Card sx={{ my: 1, width: "100%", p: 0 }}>
            <CardHeader
              avatar={
                <Avatar
                  aria-label="recipe"
                  src={user.avatarURL}
                  alt={user.fullName}
                />
              }
              title={user.fullName}
              subheader={
                <Typography
                  fontWeight={200}
                  fontSize=".75rem"
                  variant="subtitle2"
                >
                  {user.username}
                </Typography>
              }
            />
          </Card>
          <DialogActions sx={{ justifyContent: "space-between" }}>
            <Button
              onClick={handleClose}
              color="primary"
              variant="contained"
              sx={{ width: "100%" }}
            >
              No
            </Button>
            <LoadingButton
              loading={loading}
              onClick={handleUnFollow}
              variant="contained"
              color="error"
              sx={{ width: "100%" }}
            >
              Yes
            </LoadingButton>
          </DialogActions>
        </FormControl>
      </Dialog>
    </>
  );
}
