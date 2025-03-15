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

export function PromoteMemberModal({
  open,
  onClose,
  onKickMember,
  loading,
  onUpdateToModerator,
  selectedMember
}: {
  open: boolean;
  loading: boolean;
  onClose?: () => unknown;
  onKickMember: (memberId: string) => unknown;
  onUpdateToModerator: (memberId: string) => unknown;
  selectedMember: UserProfilesEntity;
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
          <DialogTitle sx={{ pb: 0 }} color="info">
            PROMOTE TO MODERATOR
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Share your workload with {selectedMember.fullName}</DialogContentText>
            <Paper elevation={3}>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar src={selectedMember.avatarURL} alt={selectedMember.avatarURL} />
                </ListItemIcon>
                <ListItemText>
                  <Stack direction="row" justifyContent="space-between" alignContent="center" alignItems="center">
                    <Typography>{selectedMember.fullName}</Typography>
                    <Box display="flex" alignContent="center" alignItems="center" justifyContent="space-between">
                      <Chip label="Member" color="primary" />
                      <IconButton onClick={() => onKickMember(selectedMember.userId)}>
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
            <Button onClick={onClose}>CANCEL</Button>
            <LoadingButton loading={loading} onClick={() => onUpdateToModerator(selectedMember.userId)}>
              <Chip variant="filled" color="info" label="PROMOTE" />
            </LoadingButton>
          </DialogActions>
        </FormControl>
      </Dialog>
    </>
  );
}
