'use client';

import useMessageAPI from '@/hooks/api/useMessageAPI';
import { GroupsEntity } from '@/hooks/entities/messages.entities';
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function AddToGroupModal({
  isOpen,
  onClose,
  memberId
}: {
  isOpen: boolean;
  onClose?: () => unknown;
  memberId: string;
}) {
  const [open, setOpen] = useState<boolean>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const [groups, setGroups] = useState<GroupsEntity[]>([]);
  const { getGroups, addMemberToGroup } = useMessageAPI();

  const loadGroups = async () => {
    try {
      const fetchGroups = await getGroups();
      setGroups(fetchGroups);
    } catch (error) {
      console.log(error);
      toast.error('FAILED TO LOAD GROUPS!');
    }
  };

  const handleAddMemberToGroup = async (groupId: string, memberId: string) => {
    try {
      await addMemberToGroup(groupId, memberId);
      handleClose();
      toast.success('ADDED TO GROUP');
    } catch (error) {
      console.log(error);
      toast.error('FAILED TO ADD!');
    }
  };

  useEffect(() => {
    loadGroups();
  }, []); //eslint-disable-line

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };
  return (
    <>
      <Dialog
        open={open}
        fullWidth
        keepMounted
        maxWidth="xs"
        PaperProps={{
          style: {
            margin: 0,
            width: '100%'
          }
        }}
        sx={{ mb: 1.5 }}
        onClose={handleClose}
        aria-describedby="add-group-modal"
      >
        <DialogTitle sx={{ pb: 0 }}>YOUR GROUPS</DialogTitle>
        <DialogContent>
          <DialogContentText>Add friends in your group 🚀</DialogContentText>
          <List sx={{ width: '100%', padding: 0 }}>
            {groups.map((group, idx) => (
              <Paper key={idx}>
                <ListItemButton sx={{ p: 0, py: 1, borderRadius: 2, mb: 0.5 }}>
                  <ListItemIcon sx={{ px: 1 }}>
                    <Avatar src={group.groupAvatar} alt={group.groupAvatar} />
                  </ListItemIcon>
                  <ListItemText>
                    <Stack
                      direction="row"
                      justifyContent={'space-between'}
                      alignContent={'center'}
                      alignItems={'center'}
                    >
                      <Stack direction={'column'}>
                        <Typography variant="body2">
                          {group.groupName}
                        </Typography>

                        <Typography variant="caption">
                          {group.description}
                        </Typography>
                      </Stack>

                      <Button
                        onClick={() =>
                          handleAddMemberToGroup(group._id, memberId)
                        }
                        disabled={group.participants.includes(memberId)}
                      >
                        {group.participants.includes(memberId)
                          ? 'ADDED'
                          : 'ADD'}
                      </Button>
                    </Stack>
                  </ListItemText>
                </ListItemButton>
              </Paper>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}
