'use client';

import useAPI from '@/hooks/api/useAPI';
import useMessageAPI from '@/hooks/api/useMessageAPI';
import { GroupContext } from '@/hooks/context/group-context';
import { GroupsEntity } from '@/hooks/entities/messages.entities';
import { UserProfilesEntity } from '@/hooks/entities/users.entities';
import { Container, Divider } from '@mui/material';
import { useContext, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { GroupDeleteModal } from './DeleteGroupModal';
import { InfoFooter } from './InfoFooter';
import { InfoHeader } from './InfoHeader';
import { InfoOptions } from './InfoOptions';
import { MemberInfoModal } from './MemberInfoModal';
import { UpdateGroupModal } from './UpdateGroupModal';

export default function GroupInfoPage() {
  const [group, setGroupInfo] = useContext(GroupContext);
  const { uploadFile } = useAPI();
  const inputRef = useRef<HTMLInputElement>(null);
  const { updateGroup } = useMessageAPI();
  const [updateGroupModal, setUpdateGroupModal] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<UserProfilesEntity | null>(null);
  const [memberInfoModal, setMemberInfoModal] = useState<boolean>(false);
  const [groupDeleteModal, setGroupDeleteModal] = useState<boolean>(false);

  const handleUpload = async (file: File) => {
    try {
      const formdata = new FormData();
      formdata.append('file', file);

      const { url } = await uploadFile(formdata);
      await updateGroup(group._id, { groupAvatar: url });

      setGroupInfo((prev) => ({ ...prev, groupAvatar: url }));
    } catch (error) {
      console.log(error);
      toast.error('FAILED TO UPLOAD!');
    }
  };

  const handlePromoteMember = (selectedMember: UserProfilesEntity) => {
    setGroupInfo((prev) => ({
      ...prev,
      moderators: [...prev.moderators, selectedMember.userId]
    }));
  };

  const handleKickMember = (selectedMember: UserProfilesEntity) => {
    setGroupInfo((prev) => ({
      ...prev,
      members: prev.members.filter((member) => member.userId !== selectedMember.userId)
    }));
  };

  const handleDemoteMember = (selectedMember: UserProfilesEntity) => {
    setGroupInfo((prev) => ({
      ...prev,
      moderators: prev.moderators.filter((memberId) => memberId !== selectedMember.userId)
    }));
  };

  const handleUpdateGroup = (grp: GroupsEntity) => {
    setGroupInfo((prev) => ({
      ...prev,
      groupName: grp.groupName,
      description: grp.description
    }));
  };

  return (
    <>
      <Container>
        <InfoHeader group={group} inputRef={inputRef} onUpload={(file) => handleUpload(file)} />
        <Divider />
        <InfoOptions
          group={group}
          onMemberInfoOpen={(open) => setMemberInfoModal(open)}
          onSelectedMember={(member) => setSelectedMember(member)}
          onUpdate={() => setUpdateGroupModal(true)}
        />
        <InfoFooter group={group} onDelete={() => setGroupDeleteModal(true)} />
        <UpdateGroupModal
          isOpen={updateGroupModal}
          onClose={() => setUpdateGroupModal(false)}
          onUpdate={(grp) => handleUpdateGroup(grp)}
        />
        {selectedMember && (
          <MemberInfoModal
            group={group}
            isOpen={memberInfoModal}
            onClose={() => setMemberInfoModal(false)}
            onPromote={() => handlePromoteMember(selectedMember)}
            onKick={() => handleKickMember(selectedMember)}
            onDemote={() => handleDemoteMember(selectedMember)}
            selectedMember={selectedMember as UserProfilesEntity}
          />
        )}
        <GroupDeleteModal group={group} isOpen={groupDeleteModal} onClose={() => setGroupDeleteModal(false)} />
      </Container>
    </>
  );
}
