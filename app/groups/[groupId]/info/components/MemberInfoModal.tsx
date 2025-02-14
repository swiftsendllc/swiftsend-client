"use client";

import useMessageAPI from "@/hooks/api/useMessageAPI";
import { GroupsEntity } from "@/hooks/entities/messages.entities";
import { UserProfilesEntity } from "@/hooks/entities/users.entities";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const MemberInfoModal = ({
  group,
  isOpen,
  onClose,
  selectedMember,
}: {
  group: GroupsEntity;
  isOpen: boolean;
  onClose?: () => unknown;
  selectedMember: UserProfilesEntity;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const {
    updateMemberToModerator,
    kickMemberFromGroup,
    demoteModeratorToMember,
  } = useMessageAPI();
  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const handleUpdateMemberToModerator = async (memberId: string) => {
    setLoading(true);
    try {
      await updateMemberToModerator(group._id, memberId);
      handleClose();
      toast.success("UPGRADED TO MODERATOR");
    } catch (error) {
      console.log(error);
      toast.error("FAILED TO UPGRADE!");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoteModeratorToMember = async (memberId: string) => {
    try {
      await demoteModeratorToMember(group._id, memberId);
      handleClose();
      toast.success("DEMOTED");
    } catch (error) {
      console.log(error);
      toast.error("FAILED TO DEMOTE!");
    }
  };

  const handleKickMember = async (memberId: string) => {
    try {
      await kickMemberFromGroup(group._id, memberId);
      handleClose();
      toast.success("KICKED IN THE ASS 🍑 ");
    } catch (error) {
      console.log(error);
      toast.error("FAILED TO KICK");
    }
  };

  return (
    <>
      {group.moderators.includes(selectedMember?.userId) ? (
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
            <DialogTitle sx={{ pb: 0 }} color="warning">
              DEMOTE TO MEMBER
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                SHOW {selectedMember?.fullName}, WHO IS THE JUDGE
              </DialogContentText>
              <Paper elevation={3}>
                <ListItemButton>
                  <ListItemIcon>
                    <Avatar
                      src={selectedMember?.avatarURL}
                      alt={selectedMember?.avatarURL}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignContent="center"
                      alignItems="center"
                    >
                      <Typography>{selectedMember?.fullName}</Typography>
                      <Box
                        display="flex"
                        alignContent="center"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Chip label="Moderator" color="warning" />
                        <IconButton
                          onClick={() =>
                            handleKickMember(selectedMember.userId)
                          }
                        >
                          <Chip label="KICK" color="error" />
                        </IconButton>
                      </Box>
                    </Stack>
                  </ListItemText>
                </ListItemButton>
              </Paper>
              <Stack direction="row"></Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>CANCEL</Button>
              <LoadingButton
                loading={loading}
                onClick={() =>
                  handleDemoteModeratorToMember(selectedMember.userId)
                }
              >
                <Chip variant="filled" label="DEMOTE" color="error" />
              </LoadingButton>
            </DialogActions>
          </FormControl>
        </Dialog>
      ) : (
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
            <DialogTitle sx={{ pb: 0 }} color="info">
              PROMOTE TO MODERATOR
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Share your workload with {selectedMember?.fullName}
              </DialogContentText>
              <Paper elevation={3}>
                <ListItemButton>
                  <ListItemIcon>
                    <Avatar
                      src={selectedMember?.avatarURL}
                      alt={selectedMember?.avatarURL}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignContent="center"
                      alignItems="center"
                    >
                      <Typography>{selectedMember?.fullName}</Typography>
                      <Box
                        display="flex"
                        alignContent="center"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Chip label="Member" color="primary" />
                        <IconButton
                          onClick={() =>
                            handleKickMember(selectedMember.userId)
                          }
                        >
                          <Chip variant="filled" color="error" label="KICK" />
                        </IconButton>
                      </Box>
                    </Stack>
                  </ListItemText>
                </ListItemButton>
              </Paper>
              <Stack direction="row"></Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>CANCEL</Button>
              <LoadingButton
                loading={loading}
                onClick={() =>
                  handleUpdateMemberToModerator(selectedMember.userId)
                }
              >
                <Chip variant="filled" color="info" label="PROMOTE" />
              </LoadingButton>
            </DialogActions>
          </FormControl>
        </Dialog>
      )}
    </>
  );
};
