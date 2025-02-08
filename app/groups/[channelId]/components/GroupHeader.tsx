"use  client";

import { GroupsEntity } from "@/hooks/entities/messages.entities";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
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
export const GroupHeaderPage = ({group}:{group:GroupsEntity}) => {
  const router = useRouter()
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
                  src={group.channelAvatar || "/svg/app_icon.svg"}
                  alt={group.channelName}
                />
              </>
            }
            title={group.channelName}
            subheader={group.description}
            action={
              <>
                <IconButton>
                  <ContactPhoneIcon />
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
      </Container>
    </Box>
  );
};
