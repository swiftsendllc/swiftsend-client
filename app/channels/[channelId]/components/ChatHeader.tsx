'use  client';

import { StyledBadge } from '@/components/SearchComponents';
import useMessageAPI from '@/hooks/api/useMessageAPI';
import {
  ChannelsEntity,
  MessagesEntity
} from '@/hooks/entities/messages.entities';
import { formatDate } from '@/library/helper';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import SettingsIcon from '@mui/icons-material/Settings';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Container,
  IconButton,
  LinearProgress,
  Typography
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { InfoChannelDrawer } from './InfoChannelDrawer';
export default function ChatHeader({
  channel,
  loading,
  messages,
  checkBox,
  setCheckBox,
  setBackgroundImage,
  selectedMessageIds,
  setSelectedMessageIds,
  onDelete
}: {
  onDelete: () => unknown;
  loading: boolean;
  checkBox: boolean;
  channel: ChannelsEntity;
  messages: MessagesEntity[];
  selectedMessageIds: string[];
  setBackgroundImage: React.Dispatch<React.SetStateAction<string | null>>;
  setCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMessageIds: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [infoChannelDrawer, setInfoChannelDrawer] = useState(false);
  const router = useRouter();
  const { deleteMessages } = useMessageAPI();
  const l = selectedMessageIds.length === 0;

  const handleDeleteMessages = async () => {
    try {
      await deleteMessages(selectedMessageIds);
      onDelete();
      toast.success(`${selectedMessageIds.length} MARKED AS DELETED`);
      setCheckBox(false);
    } catch (error) {
      console.log(error);
      toast.error('FAILED TO DELETE MESSAGES!');
    }
  };
  return (
    <Box
      width="100%"
      sx={{
        position: 'fixed',
        zIndex: 8,
        left: 0,
        top: 0,
        right: 0
      }}
    >
      <Container maxWidth="xs" style={{ padding: 0 }}>
        <Card style={{ width: '100%', padding: 0 }}>
          <CardHeader
            avatar={
              <>
                <IconButton onClick={() => router.back()}>
                  <ArrowBackOutlinedIcon />
                </IconButton>
                <StyledBadge
                  isOnline={channel.receiver.isOnline}
                  overlap="circular"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
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
              </>
            }
            title={
              <IconButton
                sx={{ p: 0, m: 0 }}
                onClick={() => router.push(`/${channel.receiver.username}`)}
              >
                <Typography>{channel.receiver.fullName}</Typography>
              </IconButton>
            }
            subheader={
              channel.receiver.isOnline ? (
                <Typography variant="body2">ONLINE</Typography>
              ) : (
                formatDate(channel.receiver.lastSeen)
              )
            }
            action={
              messages.length > 0 ? (
                <>
                  {!checkBox ? (
                    <>
                      <IconButton>
                        <ContactPhoneIcon />
                      </IconButton>
                      <IconButton>
                        <VideoCameraFrontIcon />
                      </IconButton>
                      <IconButton onClick={() => setInfoChannelDrawer(true)}>
                        <SettingsIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        disabled={selectedMessageIds.length === 0}
                        onClick={() => {
                          handleDeleteMessages();
                        }}
                      >
                        <DeleteSweepIcon color={l ? 'disabled' : 'error'} />
                      </IconButton>

                      <IconButton
                        onClick={() => {
                          setSelectedMessageIds([]);
                          setCheckBox(false);
                        }}
                      >
                        <CancelIcon />
                      </IconButton>
                    </>
                  )}
                </>
              ) : null
            }
          />
          {loading && <LinearProgress />}
        </Card>
      </Container>
      <InfoChannelDrawer
        isOpen={infoChannelDrawer}
        onClose={() => setInfoChannelDrawer(false)}
        setCheckBox={setCheckBox}
        setBackgroundImage={setBackgroundImage}
      />
    </Box>
  );
}
