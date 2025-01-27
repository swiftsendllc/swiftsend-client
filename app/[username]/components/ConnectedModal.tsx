"use client";

import Transition from "@/components/Transition";
import useAPI from "@/hooks/api/useAPI";
import { FollowersEntity } from "@/hooks/entities/users.entities";
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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ConnectedModal({
  isOpen,
  onClose,
  user,
  onUnFollow
}: {
  isOpen: boolean;
  onClose?: () => unknown;
  user: FollowersEntity;
  onUnFollow: (useFollowedUserId: string) =>void
}) {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const { unFollowProfile } = useAPI();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const handleUnFollow = async () => {
    setLoading(true);
    try {
      await unFollowProfile(user.followedUserId);
      handleClose();
      onUnFollow(user.user.userId)
      toast.success(`Disconnected`);
    } catch (error) {
      console.log(error);
      toast.error(`Failed to disconnect!!`);
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
                  src={user.user.avatarURL}
                  alt={user.user.fullName}
                />
              }
              title={user.user.fullName}
              subheader={
                <Typography
                  fontWeight={200}
                  fontSize=".75rem"
                  variant="subtitle2"
                >
                  {user.user.username}
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
