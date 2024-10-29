"use client";

import Transition from "@/components/Transition";
import { CreatorContext } from "@/hooks/creator-context";
import useAPI from "@/hooks/useAPI";
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

export default function UnFollowModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose?: () => unknown;
}) {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);

  const { unFollowProfile } = useAPI();
  const [loading, setLoading] = useState(false);

  const [creator, setCreator] = useContext(CreatorContext);
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const handleUnFollow = async (userId: string) => {
    setLoading(true);
    try {
      await unFollowProfile(userId);
      setCreator((previous) => ({...previous, following: false}) )
      router.push(`/${creator.username}`);
      handleClose();
    } catch (error) {
      console.log(error);
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
            Are you sure you want to delete {creator.fullName} from your
            following list?
          </DialogTitle>
          <Card sx={{ my: 1, width: "100%", p: 0 }}>
            <CardHeader
              avatar={
                <Avatar
                  aria-label="recipe"
                  src={creator.avatarURL}
                  alt={creator.fullName}
                />
              }
              title={creator.fullName}
              subheader={
                <Typography
                  fontWeight={200}
                  fontSize=".75rem"
                  variant="subtitle2"
                >
                  {creator.username}
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
              onClick={() => handleUnFollow(creator.userId)}
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
