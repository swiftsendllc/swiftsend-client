"use client";

import useAPI from "@/hooks/api/useAPI";
import useMessageAPI from "@/hooks/api/useMessageAPI";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function GroupCreateModalPage({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose?: () => unknown;
}) {
  const [open, setOpen] = useState<boolean>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const [loading, setLoading] = useState<boolean>(false);
  const { createGroup } = useMessageAPI();
  const [groupName, setGroupName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File>();
  const { uploadFile } = useAPI();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [groupAvatar, setGroupAvatar] = useState<string>("");

  const handleClose = () => {
    setOpen(false);
    onClose?.();
    setFile(undefined);
    setGroupName("");
    setGroupAvatar("");
    setDescription("");
  };

  const handleUpload = async () => {
    if (!file) return null;
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { url } = await uploadFile(formData);
      return url;
    } catch {
      return null;
    }
  };

  const handleCreateGroup = async () => {
    setLoading(true);
    try {
      const url = await handleUpload();
      if (url) setGroupAvatar(url);

      await createGroup({
        groupName: groupName,
        description: description,
        groupAvatar: url ?? null,
      });

      toast.success("SUCCESSFULLY CREATED GROUP");
      onClose?.();
    } catch (error) {
      console.log(error);
      toast.error("FAILED TO CREATE GROUP!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        fullWidth
        keepMounted
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        PaperProps={{
          style: {
            margin: 0,
            width: "100%",
          },
        }}
        aria-describedby="dialog-open-modal"
      >
        <FormControl
          variant="standard"
          fullWidth
          component="form"
          sx={{ margin: 0, padding: 0 }}
        >
          <DialogTitle sx={{ pb: 0 }}>Create new group</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add friends 👬 and start connecting with them
            </DialogContentText>
            <Stack direction="row">
              <TextField
                id="channel-name"
                type="text"
                placeholder="Enter group name*"
                fullWidth
                variant="standard"
                value={groupName}
                onChange={(event) => {
                  setGroupName(event.target.value || "");
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <DriveFileRenameOutlineIcon sx={{ padding: 1 }} />
                    ),
                  },
                }}
                sx={{ mb: 1.5 }}
              />
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ margin: 2 }}
              />
              <Button onClick={() => inputRef.current?.click()}>
                <Avatar src={groupAvatar} alt="C">
                  <CameraAltIcon />
                </Avatar>
              </Button>
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                hidden
                onChange={(event) => {
                  const input = event.target;
                  if (!input.files?.length) return;
                  const file = input.files[0];
                  setFile(file);
                  setGroupAvatar(URL.createObjectURL(file));
                }}
              />
            </Stack>

            <TextField
              id="description"
              placeholder="Enter group description"
              type="text"
              fullWidth
              variant="standard"
              value={description}
              slotProps={{
                input: {
                  startAdornment: <DescriptionIcon sx={{ padding: 1 }} />,
                },
              }}
              onChange={(event) => {
                event.preventDefault();
                setDescription(event.target.value);
              }}
              sx={{ mb: 1.5 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <LoadingButton
              loading={loading}
              onClick={handleCreateGroup}
              disabled={!(groupName && description)}
            >
              CONFIRM
            </LoadingButton>
          </DialogActions>
        </FormControl>
      </Dialog>
    </>
  );
}
