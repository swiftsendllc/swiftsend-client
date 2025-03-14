'use client';

import useAPI from '@/hooks/api/useAPI';
import useMessageAPI from '@/hooks/api/useMessageAPI';
import { GroupContext } from '@/hooks/context/group-context';
import { UserContext } from '@/hooks/context/user-context';
import { UserProfilesEntity } from '@/hooks/entities/users.entities';
import { DeleteForeverTwoTone, LogoutOutlined } from '@mui/icons-material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Button, Container, Divider, IconButton, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { useContext, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import DeleteGroupModal from './DeleteGroupModal';
import { InfoHeader } from './InfoHeader';
import { InfoOptions } from './InfoOptions';
import MemberInfoModal from './MemberInfoModal';
import UpdateGroupModal from './UpdateGroupModal';

export default function GroupInfoPage() {
  const [group, setGroups] = useContext(GroupContext);
  const [creator] = useContext(UserContext);
  const { uploadFile } = useAPI();
  const inputRef = useRef<HTMLInputElement>(null);
  const { updateGroup } = useMessageAPI();
  const [updateGroupOpen, setUpdateGroupOpen] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<UserProfilesEntity | null>(null);
  const [memberInfoOpen, setMemberInfoOpen] = useState<boolean>(false);
  const [deleteGroupOpen, setDeleteGroupOpen] = useState<boolean>(false);

  const handleUpload = async (file: File) => {
    try {
      const formdata = new FormData();
      formdata.append('file', file);

      const { url } = await uploadFile(formdata);
      await updateGroup(group._id, { groupAvatar: url });

      setGroups((prev) => ({ ...prev, groupAvatar: url }));
    } catch (error) {
      console.log(error);
      toast.error('FAILED TO UPLOAD!');
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <InfoHeader group={group} inputRef={inputRef} onUpload={(file) => handleUpload(file)} />
        <Divider />
        <InfoOptions
          group={group}
          onMemberInfoOpen={(open) => setMemberInfoOpen(open)}
          onSelectedMember={(member) => setSelectedMember(member)}
          onUpdate={() => setUpdateGroupOpen(true)}
        />
        <Box display="flex" justifyContent="space-between" padding={1}>
          <Stack direction="row" justifyContent="space-around" alignContent="center" alignItems="center">
            <IconButton color="error">
              <LogoutOutlined />
            </IconButton>
            <Typography color="error">Leave group</Typography>
          </Stack>
          <Typography>
            <KeyboardArrowRightIcon />
          </Typography>
        </Box>
        <Divider />
        {group.adminId === creator.userId && (
          <Box padding={1}>
            <Button color="error" onClick={() => setDeleteGroupOpen(true)}>
              <DeleteForeverTwoTone />
              Delete group
            </Button>
          </Box>
        )}
        <Box>
          <Divider />
          <Typography color="info"> Created at {moment(group.createdAt).format('LT L')}</Typography>
          <Typography color="info"> Created by {group.adminId === creator.userId && creator.fullName}</Typography>
        </Box>
        <UpdateGroupModal
          isOpen={updateGroupOpen}
          onClose={() => setUpdateGroupOpen(false)}
          onUpdate={(grp) =>
            setGroups((prev) => ({
              ...prev,
              groupName: grp.groupName,
              description: grp.description
            }))
          }
        />
        {selectedMember && (
          <MemberInfoModal
            isOpen={memberInfoOpen}
            onClose={() => setMemberInfoOpen(false)}
            group={group}
            onPromote={() =>
              setGroups((prev) => ({
                ...prev,
                moderators: [...prev.moderators, selectedMember.userId]
              }))
            }
            onDelete={() =>
              setGroups((prev) => ({
                ...prev,
                members: prev.members.filter((member) => member.userId !== selectedMember.userId)
              }))
            }
            onDemote={() =>
              setGroups((prev) => ({
                ...prev,
                moderators: prev.moderators.filter((memberId) => memberId !== selectedMember.userId)
              }))
            }
            selectedMember={selectedMember as UserProfilesEntity}
          />
        )}
        <DeleteGroupModal group={group} isOpen={deleteGroupOpen} onClose={() => setDeleteGroupOpen(false)} />
      </Container>
    </>
  );
}
