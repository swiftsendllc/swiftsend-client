"use client";

import { GroupContext } from "@/hooks/context/group-context";
import {
  ArrowBackOutlined,
  CameraAlt,
  DeleteForeverTwoTone,
  LogoutOutlined,
} from "@mui/icons-material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ImageIcon from "@mui/icons-material/Image";

import { UserContext } from "@/hooks/context/user-context";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Avatar,
  Badge,
  Box,
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
  Typography,
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { UpgradeGroupModalPage } from "./UpdateGroupModal";

export default function GroupInfoPage() {
  const [group] = useContext(GroupContext);
  const [creator] = useContext(UserContext);
  const router = useRouter();
  const [updateGroupModal, setUpdateGroupModal] = useState<boolean>(false);
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
            <AdminPanelSettingsIcon />
          </IconButton>
        </Stack>
        <Divider />
        <Box mt={1}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={<CameraAlt color="info" />}
          >
            <Avatar
              src={group.groupAvatar}
              alt={group.groupAvatar}
              sx={{ width: 100, height: 100 }}
            />
          </Badge>

          <Box display="flex">
            <Typography variant="h6">{group.groupName}</Typography>
            <Divider orientation="vertical" sx={{ margin: 1 }} flexItem />
            <Typography variant="h6">{group.description}</Typography>
            <Divider orientation="vertical" sx={{ margin: 1 }} flexItem />
            <Typography variant="h6">
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
                onClick={() => setUpdateGroupModal(true)}
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
          <ListItemButton sx={{ padding: 0, py: 1, borderRadius: 2 }}>
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
                      Transfer leadership{" "}
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
              <Paper elevation={3}>
                <ListItemButton>
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
          <Box display="flex" justifyContent="space-between" padding={1}>
            <Stack
              direction="row"
              justifyContent="space-around"
              alignContent="center"
              alignItems="center"
            >
              <IconButton color="error">
                <DeleteForeverTwoTone />
              </IconButton>
              <Typography color="error">Delete group</Typography>
            </Stack>
            <Typography>
              <KeyboardArrowRightIcon />
            </Typography>
          </Box>
        )}
        <Box>
          <Divider />
          <Typography color="info">
            {" "}
            Created at {moment(group.createdAt).format("LT L")}
          </Typography>
          <Typography color="info">
            {" "}
            Created by {group.admin === creator.userId && creator.fullName}
          </Typography>
        </Box>
        <UpgradeGroupModalPage
          isOpen={updateGroupModal}
          onClose={() => setUpdateGroupModal(false)}
        />
      </Container>
    </>
  );
}
