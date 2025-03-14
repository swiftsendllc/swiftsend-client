import { CreatorContext } from '@/hooks/context/creator-context';
import { GroupsEntity } from '@/hooks/entities/messages.entities';
import { UserProfilesEntity } from '@/hooks/entities/users.entities';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  Avatar,
  Box,
  Chip,
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

export function InfoOptions({
  group,
  onUpdate,
  onSelectedMember,
  onMemberInfoOpen
}: {
  group: GroupsEntity;
  onUpdate: () => unknown;
  onSelectedMember: (user: UserProfilesEntity) => unknown;
  onMemberInfoOpen: (open:boolean) => unknown
}) {
  const [creator] = useContext(CreatorContext);
  const infoOptions = [
    {
      label: 'Change group info',
      leftIcon: <DriveFileRenameOutlineIcon />,
      rightIcon: <KeyboardArrowRightIcon />,
      action: () => onUpdate(),
      disabled: () => undefined
    },
    {
      label: 'Media, Images',
      leftIcon: <DriveFileRenameOutlineIcon />,
      rightIcon: <KeyboardArrowRightIcon />,
      action: () => undefined,
      disabled: () => undefined
    },
    {
      label: 'Transfer leadership',
      leftIcon: <DriveFileRenameOutlineIcon />,
      rightIcon: <KeyboardArrowRightIcon />,
      action: () => undefined,
      disabled: () => undefined
    },
    {
      label: 'Change group info',
      leftIcon: <DriveFileRenameOutlineIcon />,
      rightIcon: <KeyboardArrowRightIcon />,
      action: () => undefined,
      disabled: () => undefined
    }
  ];
  return (
    <>
      {(group.adminId === creator.userId || group.moderators.includes(creator.userId)) && (
        <>
          <List sx={{ padding: 0 }}>
            {infoOptions.map((option, idx) => (
              <ListItemButton key={idx} sx={{ padding: 0, py: 1, borderRadius: 2 }} onClick={option.action}>
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
      )}
      <Typography sx={{ mt: 1 }}>GROUP MEMBERS </Typography>

      <Box>
        {group.members.map((member, idx) => (
          <List key={idx}>
            <Paper elevation={3} sx={{ backgroundColor: 'InfoText' }}>
              <ListItemButton
                onClick={() => {
                  if (group.adminId === creator.userId) {
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
                    <Typography>{member.fullName}</Typography>
                    <Box display="flex">
                      {group.adminId === member.userId ? (
                        <Chip label="Admin" color="info" />
                      ) : group.moderators.includes(member.userId) ? (
                        <Chip label="Moderator" color="warning" />
                      ) : (
                        <Chip label="Member" color="primary" />
                      )}
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
