import { UserProfilesEntity } from '@/hooks/entities/users.entities';
import { LoadingButton } from '@mui/lab';
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
  Typography
} from '@mui/material';

export function DemoteMemberModal({
  open,
  onClose,
  selectedMember,
  onKickMember,
  loading,
  onDemoteMember
}: {
  open: boolean;
  loading: boolean;
  onClose?: () => unknown;
  selectedMember: UserProfilesEntity;
  onKickMember: (memberId: string) => unknown;
  onDemoteMember: (memberId: string) => unknown;
}) {
  return (
    <>
      <Dialog
        fullWidth
        keepMounted
        open={open}
        onClose={onClose}
        maxWidth="xs"
        PaperProps={{
          style: {
            margin: 0,
            width: '100%'
          }
        }}
        aria-describedby="dialog-open-modal"
      >
        <FormControl variant="standard" fullWidth component="form" sx={{ margin: 0, padding: 0 }}>
          <DialogTitle sx={{ pb: 0 }} color="warning">
            DEMOTE TO MEMBER
          </DialogTitle>
          <DialogContent>
            <DialogContentText>SHOW {selectedMember.fullName}, WHO IS THE JUDGE</DialogContentText>
            <Paper elevation={3}>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar src={selectedMember.avatarURL} alt={selectedMember.avatarURL} />
                </ListItemIcon>
                <ListItemText>
                  <Stack direction="row" justifyContent="space-between" alignContent="center" alignItems="center">
                    <Typography>{selectedMember.fullName}</Typography>
                    <Box display="flex" alignContent="center" alignItems="center" justifyContent="space-between">
                      <Chip label="Moderator" color="warning" />
                      <IconButton onClick={() => onKickMember(selectedMember.userId)}>
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
            <Button onClick={onClose}>CANCEL</Button>
            <LoadingButton loading={loading} onClick={() => onDemoteMember(selectedMember.userId)}>
              <Chip variant="filled" label="DEMOTE" color="error" />
            </LoadingButton>
          </DialogActions>
        </FormControl>
      </Dialog>
    </>
  );
}
