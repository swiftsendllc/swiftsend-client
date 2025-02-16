"use client";
import useMessageAPI from "@/hooks/api/useMessageAPI";
import { GroupContext } from "@/hooks/context/group-context";
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
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UpdateGroupModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose?: () => unknown;
}) {
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const [loading, setLoading] = useState<boolean>(false);
  const { updateGroup } = useMessageAPI();
  const [group] = useContext(GroupContext);
  const [didChange, setDidChange] = useState<boolean>(false);
  const [groupAvatar] = useState<string>(group.groupAvatar);
  const [groupName, setGroupName] = useState<string>(group.groupName);
  const [description, setDescription] = useState<string>(group.description);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  useEffect(() => {
    setDidChange(
      description !== group.description || groupName !== group.groupName
    );
  }, [groupName, description, group]);

  const handleChange = async () => {
    setLoading(true);
    try {
      await updateGroup(group._id, {
        groupName,
        description,
        groupAvatar,
      });

      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("FAILED TO UPDATE!");
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
          <DialogTitle sx={{ pb: 0 }}>Edit your group</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Update your group with infinite aura
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
                  setGroupName(event.target.value);
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
              <Avatar src={group.groupAvatar} alt="C">
                <CameraAltIcon />
              </Avatar>
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
              onClick={handleChange}
              disabled={!didChange}
            >
              CONFIRM
            </LoadingButton>
          </DialogActions>
        </FormControl>
      </Dialog>
    </>
  );
}
