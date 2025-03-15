import { GroupsEntity } from '@/hooks/entities/messages.entities';
import { UserProfilesEntity } from '@/hooks/entities/users.entities';
import { Chip } from '@mui/material';

export const CustomChip = ({ group, member }: { group: GroupsEntity; member: UserProfilesEntity }) => {
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
