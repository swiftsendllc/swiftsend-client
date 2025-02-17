'use client';

import { GroupContext } from '@/hooks/context/group-context';
import {
  ArrowBackOutlined,
  CameraAlt,
  DeleteForeverTwoTone,
  LogoutOutlined
} from '@mui/icons-material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ImageIcon from '@mui/icons-material/Image';

import useAPI from '@/hooks/api/useAPI';
import useMessageAPI from '@/hooks/api/useMessageAPI';
import { UserContext } from '@/hooks/context/user-context';
import { UserProfilesEntity } from '@/hooks/entities/users.entities';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useContext, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import DeleteGroupModal from './components/DeleteGroupModal';
import MemberInfoModal from './components/MemberInfoModal';
import UpdateGroupModal from './components/UpdateGroupModal';

export default function GroupInfoPage() {
  const [group, setGroups] = useContext(GroupContext);
  const [creator] = useContext(UserContext);
  const router = useRouter();
  const { uploadFile } = useAPI();
  const { updateGroup } = useMessageAPI();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [updateGroupOpen, setUpdateGroupOpen] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] =
    useState<UserProfilesEntity | null>(null);
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
        <Stack
          direction="row"
          mt={1}
          mb={2}
          justifyContent="space-between"
          alignContent="center"
          textAlign="center"
        >
          <IconButton onClick={() => router.back()}>
            <ArrowBackOutlined />
          </IconButton>
          <Typography variant="body1">GROUP INFO</Typography>
          <IconButton>
            <AdminPanelSettingsIcon
              color={
                group.admin === creator.userId
                  ? 'info'
                  : group.moderators.includes(creator.userId)
                    ? 'warning'
                    : 'primary'
              }
            />
          </IconButton>
        </Stack>
        <Divider />
        <Box mt={1}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <>
                <IconButton
                  sx={{ padding: 0 }}
                  onClick={() => {
                    if (
                      group.admin === creator.userId ||
                      group.moderators.includes(creator.userId)
                    ) {
                      inputRef.current?.click();
                    }
                  }}
                >
                  <CameraAlt color="info" />
                </IconButton>
                <input
                  accept="image/*"
                  type="file"
                  ref={inputRef}
                  hidden
                  onChange={(event) => {
                    if (!event.target.files?.length) return;
                    handleUpload(event.target.files[0]);
                  }}
                />
              </>
            }
          >
            <Avatar
              src={group.groupAvatar}
              alt={group.groupAvatar}
              sx={{ width: 100, height: 100 }}
            />
          </Badge>

          <Box display="flex">
            <Typography variant="body1">{group.groupName}</Typography>
            <Divider orientation="vertical" sx={{ margin: 1 }} flexItem />
            <Typography variant="body1">{group.description}</Typography>
            <Divider orientation="vertical" sx={{ margin: 1 }} flexItem />
            <Typography variant="body1">
              {group.participants.length} · 👬
            </Typography>
          </Box>
        </Box>
        <Divider />
        {(group.admin === creator.userId ||
          group.moderators.includes(creator.userId)) && (
          <>
            <List sx={{ padding: 0 }}>
              <ListItemButton
                sx={{ padding: 0, py: 1, borderRadius: 2 }}
                onClick={() => setUpdateGroupOpen(true)}
              >
                <ListItemIcon sx={{ pr: 1 }}>
                  <DriveFileRenameOutlineIcon />
                </ListItemIcon>
                <ListItemText disableTypography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignContent="center"
                    alignItems="center"
                  >
                    <Typography color="text.secondary">
                      Change group info
                    </Typography>
                    <Typography>
                      <KeyboardArrowRightIcon />
                    </Typography>
                  </Stack>
                </ListItemText>
              </ListItemButton>
            </List>
            <Divider />
          </>
        )}

        <List sx={{ padding: 0 }}>
          <ListItemButton
            sx={{ padding: 0, py: 1, borderRadius: 2 }}
            onClick={() => router.push(`/groups/${group._id}/media`)}
          >
            <ListItemIcon sx={{ pr: 1 }}>
              <ImageIcon />
            </ListItemIcon>
            <ListItemText disableTypography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignContent="center"
                alignItems="center"
              >
                <Typography color="text.secondary">Media, Images</Typography>
                <Typography>
                  <KeyboardArrowRightIcon />
                </Typography>
              </Stack>
            </ListItemText>
          </ListItemButton>
        </List>
        <Divider />
        {group.admin === creator.userId && (
          <>
            <List sx={{ padding: 0 }}>
              <ListItemButton
                sx={{ padding: 0, py: 1, borderRadius: 2 }}
                disabled={group.admin !== creator.userId}
              >
                <ListItemIcon sx={{ pr: 1 }}>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText disableTypography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignContent="center"
                    alignItems="center"
                  >
                    <Typography color="text.secondary">
                      Transfer leadership{' '}
                    </Typography>
                    <Typography>
                      <KeyboardArrowRightIcon />
                    </Typography>
                  </Stack>
                </ListItemText>
              </ListItemButton>
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
                    if (group.admin === creator.userId) {
                      setMemberInfoOpen(true);
                      setSelectedMember(member);
                    }
                  }}
                >
                  <ListItemIcon>
                    <Avatar src={member.avatarURL} alt={member.avatarURL} />
                  </ListItemIcon>
                  <ListItemText>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignContent="center"
                      alignItems="center"
                    >
                      <Typography>{member.fullName}</Typography>
                      <Box display="flex">
                        {group.admin === member.userId ? (
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
        <Divider />
        <Box display="flex" justifyContent="space-between" padding={1}>
          <Stack
            direction="row"
            justifyContent="space-around"
            alignContent="center"
            alignItems="center"
          >
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
        {group.admin === creator.userId && (
          <Box padding={1}>
            <Button color="error" onClick={() => setDeleteGroupOpen(true)}>
              <DeleteForeverTwoTone />
              Delete group
            </Button>
          </Box>
        )}
        <Box>
          <Divider />
          <Typography color="info">
            {' '}
            Created at {moment(group.createdAt).format('LT L')}
          </Typography>
          <Typography color="info">
            {' '}
            Created by {group.admin === creator.userId && creator.fullName}
          </Typography>
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
              /*
                setGroups((prev) => {
                const newModerator = [...prev.moderators]; // creates a shallow copy of the array
                if (selectedMember) newModerator.push(selectedMember.userId);
                return {
                  ...prev,
                  moderators: newModerator
                };
              })
              */

              setGroups((prev) => ({
                ...prev,
                moderators: [...prev.moderators, selectedMember.userId]
              }))
            }
            onDelete={() =>
              setGroups((prev) => ({
                ...prev,
                members: prev.members.filter(
                  (member) => member.userId !== selectedMember.userId
                )
              }))
            }
            onDemote={() =>
              setGroups((prev) => ({
                ...prev,
                moderators: prev.moderators.filter(
                  (memberId) => memberId !== selectedMember.userId
                )
              }))
            }
            selectedMember={selectedMember as UserProfilesEntity}
          />
        )}

        <DeleteGroupModal
          group={group}
          isOpen={deleteGroupOpen}
          onClose={() => setDeleteGroupOpen(false)}
        />
      </Container>
    </>
  );
}
