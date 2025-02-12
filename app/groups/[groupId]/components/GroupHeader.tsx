"use  client";

import { GroupsEntity } from "@/hooks/entities/messages.entities";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Container,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GroupMembersDrawerPage } from "./GroupMembersDrawer";
export const GroupHeaderPage = ({ group }: { group: GroupsEntity }) => {
  const router = useRouter();
  const [memberDrawer, setMemberDrawer] = useState<boolean>(false);
  return (
    <Box
      width="100%"
      sx={{
        position: "fixed",
        zIndex: 8,
        left: 0,
        top: 0,
        right: 0,
      }}
    >
      <Container maxWidth="xs" style={{ padding: 0 }}>
        <Card style={{ width: "100%", padding: 0 }}>
          <CardHeader
            avatar={
              <>
                <IconButton onClick={() => router.back()}>
                  <ArrowBackOutlinedIcon />
                </IconButton>

                <Avatar
                  aria-label="recipe"
                  src={group.groupAvatar}
                  alt={group.groupAvatar}
                />
              </>
            }
            title={group.groupName}
            subheader={group.description}
            action={
              <>
                <IconButton onClick={() => setMemberDrawer(true)}>
                  <GroupsIcon />
                </IconButton>
                <IconButton>
                  <VideoCameraFrontIcon />
                </IconButton>
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </>
            }
          />
        </Card>
        <GroupMembersDrawerPage
          isOpen={memberDrawer}
          onClose={() => setMemberDrawer(false)}
          group={group}
        />
      </Container>
    </Box>
  );
};
