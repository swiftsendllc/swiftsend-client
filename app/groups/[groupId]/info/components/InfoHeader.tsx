import { ArrowBackOutlined, CameraAlt } from '@mui/icons-material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Avatar, Badge, Box, Divider, IconButton, Stack, Typography } from '@mui/material';

import { CreatorContext } from '@/hooks/context/creator-context';
import { GroupsEntity } from '@/hooks/entities/messages.entities';
import router from 'next/router';
import { RefObject, useContext } from 'react';

export function InfoHeader({
  group,
  inputRef,
  onUpload
}: {
  group: GroupsEntity;
  inputRef: RefObject<HTMLInputElement>;
  onUpload: (file: File) => unknown;
}) {
  const [creator] = useContext(CreatorContext);
  return (
    <>
      <Stack direction="row" mt={1} mb={2} justifyContent="space-between" alignContent="center" textAlign="center">
        <IconButton onClick={() => router.back()}>
          <ArrowBackOutlined />
        </IconButton>
        <Typography variant="body1">GROUP INFO</Typography>
        <IconButton>
          <AdminPanelSettingsIcon
            color={
              group.adminId === creator.userId
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
                  if (group.adminId === creator.userId || group.moderators.includes(creator.userId)) {
                    inputRef.current?.click();
                  }
                }}
              >
                <CameraAlt color="info" />
              </IconButton>
              <input
                type="file"
                ref={inputRef}
                accept="image/*"
                onChange={(e) => {
                  if (!e.target.files?.length) return;
                  const file = e.target.files[0];
                  onUpload(file)
                }}
                hidden
              />
            </>
          }
        >
          <Avatar src={group.groupAvatar} alt={group.groupAvatar} sx={{ width: 100, height: 100 }} />
        </Badge>

        <Box display="flex">
          <Typography variant="body1">{group.groupName}</Typography>
          <Divider orientation="vertical" sx={{ margin: 1 }} flexItem />
          <Typography variant="body1">{group.description}</Typography>
          <Divider orientation="vertical" sx={{ margin: 1 }} flexItem />
          <Typography variant="body1">{group.participants.length} · 👬</Typography>
        </Box>
      </Box>
      <Divider />
    </>
  );
}
