"use client";

import useMessageAPI from "@/hooks/api/useMessageAPI";
import { GroupsEntity } from "@/hooks/entities/messages.entities";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DeleteGroupModal({
  group,
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose?: () => unknown;
  group: GroupsEntity;
}) {
  const [open, setOpen] = useState<boolean>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const [loading, setLoading] = useState<boolean>(false);
  const { deleteGroup } = useMessageAPI();

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const handleDeleteGroup = async () => {
    setLoading(true);
    try {
      await deleteGroup(group._id);
      handleClose();
      window.location.href = "/groups";
    } catch (error) {
      console.log(error);
      toast.error("FAILED TO DELETE GROUP!");
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
          <DialogTitle sx={{ pb: 0 }}>DELETE GROUP</DialogTitle>
          <DialogContent sx={{ padding: 0 }} color="error">
            Delete your group permanently
            <Paper elevation={3}>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar src={group.groupAvatar} alt={group.groupAvatar} />
                </ListItemIcon>
                <ListItemText>
                  <Typography>{group.groupName}</Typography>
                </ListItemText>
              </ListItemButton>
            </Paper>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>CANCEL</Button>
            <LoadingButton
              loading={loading}
              onClick={() => {
                handleDeleteGroup();
              }}
            >
              <Chip label="DELETE" color="error" variant="filled" />
            </LoadingButton>
          </DialogActions>
        </FormControl>
      </Dialog>
    </>
  );
}
