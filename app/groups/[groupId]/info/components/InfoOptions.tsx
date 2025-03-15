import { UserContext } from '@/hooks/context/user-context';
import { GroupsEntity } from '@/hooks/entities/messages.entities';
import { UserProfilesEntity } from '@/hooks/entities/users.entities';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { useContext } from 'react';
import { CustomChip } from '../../components/Customchip';

export function InfoOptions({
  group,
  onUpdate,
  onSelectedMember,
  onMemberInfoOpen
}: {
  group: GroupsEntity;
  onUpdate: () => unknown;
  onSelectedMember: (user: UserProfilesEntity) => unknown;
  onMemberInfoOpen: (open: boolean) => unknown;
}) {
  const [user] = useContext(UserContext);
  const infoOptions = [
    {
      label: 'Change group info',
      leftIcon: <DriveFileRenameOutlineIcon />,
      rightIcon: <KeyboardArrowRightIcon />,
      action: () => onUpdate(),
      disabled: !(group.isAdmin || group.isModerator)
    },
    {
      label: 'Media, Images',
      leftIcon: <DriveFileRenameOutlineIcon />,
      rightIcon: <KeyboardArrowRightIcon />,
      action: () => undefined,
      disabled: false
    },
    {
      label: 'Transfer leadership',
      leftIcon: <DriveFileRenameOutlineIcon />,
      rightIcon: <KeyboardArrowRightIcon />,
      action: () => undefined,
      disabled: !group.isAdmin
    }
  ];
  return (
    <>
      <>
        <List sx={{ padding: 0 }}>
          {infoOptions.map((option, idx) => (
            <ListItemButton
              key={idx}
              sx={{ padding: 0, py: 1, borderRadius: 2 }}
              disabled={option.disabled}
              onClick={option.action}
            >
              <ListItemIcon sx={{ pr: 1 }}>{option.leftIcon}</ListItemIcon>
              <ListItemText disableTypography>
                <Stack direction="row" justifyContent="space-between" alignContent="center" alignItems="center">
                  <Typography color="text.secondary">{option.label}</Typography>
                  <Typography>{option.rightIcon}</Typography>
                </Stack>
              </ListItemText>
            </ListItemButton>
          ))}
        </List>
        <Divider />
      </>
      <Typography sx={{ mt: 1 }}>GROUP MEMBERS </Typography>

      <Box>
        {group.members.map((member, idx) => (
          <List key={idx}>
            <Paper elevation={3} sx={{ backgroundColor: 'InfoText' }}>
              <ListItemButton
                onClick={() => {
                  if (group.isAdmin) {
                    onMemberInfoOpen(true);
                    onSelectedMember(member);
                  }
                }}
              >
                <ListItemIcon>
                  <Avatar src={member.avatarURL} alt={member.avatarURL} />
                </ListItemIcon>
                <ListItemText>
                  <Stack direction="row" justifyContent="space-between" alignContent="center" alignItems="center">
                    <Typography>{member.userId === user.userId ? 'You' : member.fullName}</Typography>
                    <Box display="flex">
                      <CustomChip group={group} member={member} />
                      <Typography>
                        <KeyboardArrowRightIcon />
                      </Typography>
                    </Box>
                  </Stack>
                </ListItemText>
              </ListItemButton>
            </Paper>
          </List>
        ))}
      </Box>
    </>
  );
}
