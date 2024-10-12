"use client";

import Transition from "@/components/Transition";
import { UpdateUserInput } from "@/hooks/types";
import UseAPI from "@/hooks/useAPI";
import { UserContext } from "@/hooks/useContext";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditUsernameModal({
  isOpen,
  onClose,
  currentField
}: {
  isOpen: boolean;
  onClose?: () => unknown;
  currentField: string
}) {
  const [user, setUserInfo] = useContext(UserContext);
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);

  const [didChange, setDidChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<UpdateUserInput>>({
    username: user.username,
    pronouns: user.pronouns,
    bio: user.bio,
    websiteURL: user.websiteURL,
    bannerURL: user.bannerURL,
  });

  const profiles = [
    {
      label: "Username",
      value: formData.username,
      key: "username",
    },
    {
      label: "Pronouns",
      value: formData.pronouns,
      key: "pronouns",
    },
    {
      label: "Bio",
      value: formData.bio,
      key: "bio",
    },
    {
      label: "Links",
      value: formData.websiteURL,
      key: "links",
    },
    {
      label: "Banners",
      value: formData.bannerURL,
      key: "banners",
    },
  ];

  const { updateUser } = UseAPI();

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [key]: value,
    }));
    setDidChange(true);
  };

  const handleOnChange = async () => {
    setLoading(true);
    try {
      const data = await updateUser(formData);
      setUserInfo(data);
      handleClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const currentProfile = profiles.find(
    (profile) => profile.label === currentField
  );

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
          sx={{ margin: 0, padding: 0 }}
        >
          <DialogTitle sx={{ pb: 0 }}>Edit {currentField}</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ pb: 0 }}>
              Update your {currentField.toLowerCase()}
            </DialogContentText>
            {currentProfile && (
              <TextField
                key={currentProfile.key}
                label={currentProfile.label}
                value={currentProfile.value || ""}
                fullWidth
                onChange={(event) =>
                  handleInputChange(currentProfile.key, event.target.value)
                }
                focused
                autoFocus
                variant="standard"
                sx={{ mb: 1.5 }}
              />
            )}
            <DialogActions>
              <Button onClick={handleClose} color="error">
                Discard
              </Button>
              <LoadingButton
                loading={loading}
                onClick={handleOnChange}
                disabled={!didChange}
              >
                Confirm
              </LoadingButton>
            </DialogActions>
          </DialogContent>
        </FormControl>
      </Dialog>
    </>
  );
}
