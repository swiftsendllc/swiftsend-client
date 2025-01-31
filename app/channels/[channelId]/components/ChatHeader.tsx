"use  client";

import { StyledBadge } from "@/components/SearchComponents";
import {
  ChannelsEntity,
  MessagesEntity,
} from "@/hooks/entities/messages.entities";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import {
  Avatar,
  Card,
  CardHeader,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InfoChannelDrawer from "./InfoChannelDrawer";

export const ChatHeaderPage = ({
  channel,
  messages,
}: {
  channel: ChannelsEntity;
  messages: MessagesEntity[];
}) => {
  const [infoChannelDrawer, setInfoChannelDrawer] = useState(false);
  const router = useRouter();

  return (
    <>
      <Container maxWidth="xs" style={{ padding: 0 }}>
        <Card style={{ width: "100%", padding: 0 }}>
          <CardHeader
            avatar={
              <>
                <IconButton onClick={() => router.back()}>
                  <ArrowBackOutlinedIcon />
                </IconButton>
                {channel.receiver.isOnline ? (
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent
                    variant="dot"
                  >
                    <Avatar
                      aria-label="recipe"
                      src={channel.receiver.avatarURL}
                      alt={channel.receiver.fullName}
                    />
                  </StyledBadge>
                ) : (
                  <Avatar
                    aria-label="recipe"
                    src={channel.receiver.avatarURL}
                    alt={channel.receiver.fullName}
                  />
                )}
              </>
            }
            title={channel.receiver.fullName}
            subheader={
              channel.receiver.isOnline ? (
                <Typography variant="body2">ONLINE</Typography>
              ) : new Date().getTime() -
                  new Date(channel.receiver.lastSeen).getTime() >=
                24 * 60 * 60 * 1000 ? (
                ` Seen ${moment(channel.receiver.lastSeen).format("LTL")}`
              ) : (
                `last seen at ${moment(channel.receiver.lastSeen).fromNow()}`
              )
            }
            action={
              messages.length > 0 ? (
                <>
                  <IconButton>
                    <ContactPhoneIcon />
                  </IconButton>
                  <IconButton>
                    <VideoCameraFrontIcon />
                  </IconButton>
                  <IconButton onClick={() => setInfoChannelDrawer(true)}>
                    <FilterAltOutlinedIcon />
                  </IconButton>
                </>
              ) : null
            }
          />
        </Card>
      </Container>
      <InfoChannelDrawer
        channel={channel}
        isOpen={infoChannelDrawer}
        onClose={() => setInfoChannelDrawer(false)}
      />
    </>
  );
};
