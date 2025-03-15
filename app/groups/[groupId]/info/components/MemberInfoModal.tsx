'use client';

import useMessageAPI from '@/hooks/api/useMessageAPI';
import { GroupsEntity } from '@/hooks/entities/messages.entities';
import { UserProfilesEntity } from '@/hooks/entities/users.entities';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { DemoteMemberModal } from './DemoteMemberModal';
import { PromoteMemberModal } from './PromoteMemberModal';

export  function MemberInfoModal({
  group,
  isOpen,
  onClose,
  selectedMember,
  onKick,
  onDemote,
  onPromote
}: {
  group: GroupsEntity;
  isOpen: boolean;
  onClose?: () => unknown;
  selectedMember: UserProfilesEntity;
  onKick: () => unknown;
  onDemote: () => unknown;
  onPromote: () => unknown;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const { updateMemberToModerator, kickMemberFromGroup, demoteModeratorToMember } = useMessageAPI();
  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const handleUpdateMemberToModerator = async (memberId: string) => {
    setLoading(true);
    try {
      await updateMemberToModerator(group._id, memberId);
      onPromote();
      handleClose();
      toast.success('UPGRADED TO MODERATOR');
    } catch (error) {
      console.log(error);
      toast.error('FAILED TO UPGRADE!');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoteModeratorToMember = async (memberId: string) => {
    try {
      await demoteModeratorToMember(group._id, memberId);
      onDemote();
      handleClose();
      toast.success('DEMOTED TO MEMBER');
    } catch (error) {
      console.log(error);
      toast.error('FAILED TO DEMOTE!');
    }
  };

  const handleKickMember = async (memberId: string) => {
    try {
      await kickMemberFromGroup(group._id, memberId);
      onKick();
      handleClose();
      toast.success('KICKED IN THE ASS 🍑 ');
    } catch (error) {
      console.log(error);
      toast.error('FAILED TO KICK');
    }
  };

  return (
    <>
      {group.moderators.includes(selectedMember.userId) ? (
        <DemoteMemberModal
          loading={loading}
          onDemoteMember={(memberId) => handleDemoteModeratorToMember(memberId)}
          onKickMember={(memberId) => handleKickMember(memberId)}
          open={open}
          selectedMember={selectedMember}
          onClose={handleClose}
        />
      ) : (
        <PromoteMemberModal
          loading={loading}
          onKickMember={(memberId) => handleKickMember(memberId)}
          onUpdateToModerator={(memberId) => handleUpdateMemberToModerator(memberId)}
          open={open}
          selectedMember={selectedMember}
          onClose={handleClose}
        />
      )}
    </>
  );
}
