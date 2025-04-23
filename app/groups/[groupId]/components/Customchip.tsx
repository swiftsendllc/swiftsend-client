import { GroupsEntity } from '@/hooks/entities/messages.entities';
import { UserProfilesEntity } from '@/hooks/entities/users.entities';
import { Chip } from '@mui/material';

interface CustomChipProps {
  group: GroupsEntity;
  member: UserProfilesEntity;
}

export const CustomChip = ({ group, member }: CustomChipProps) => {
  return (
    <>
      {group.adminId === member.userId ? (
        <Chip label="Admin" color="info" />
      ) : group.moderators.includes(member.userId) ? (
        <Chip label="Moderator" color="warning" />
      ) : (
        <Chip label="Member" color="primary" />
      )}
    </>
  );
};
