import { ChannelContext } from '@/hooks/context/channel-context';
import { UserContext } from '@/hooks/context/user-context';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Avatar, Box, Chip, Divider, IconButton, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { Fragment, useContext } from 'react';

interface MessageProps {
  messages: MessagesEntity[];
}

const messageThreadOptions = [
  {
    label: 'starred',
    icon: <StarBorderIcon />
  },
  {
    label: 'starred',
    icon: <NotificationsNoneIcon />
  },
  {
    label: 'starred',
    icon: <PushPinOutlinedIcon />
  },
  {
    label: 'starred',
    icon: <PhotoLibraryOutlinedIcon />
  },
  {
    label: 'starred',
    icon: <MoreVertIcon />
  }
];

export function MessageThread({ messages }: MessageProps) {
  const router = useRouter();
  const theme = useTheme();
  const [channel] = useContext(ChannelContext);
  const [user] = useContext(UserContext);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      flex={1}
      display="flex"
      flexDirection="column"
      minWidth="340px"
      width="auto"
      borderRight="1px solid "
      height="100vh"
    >
      <Box px={2} py={1} borderBottom="1px solid " display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={1}>
          {isSmallScreen && (
            <IconButton sx={{ p: 0, m: 0 }} onClick={() => router.back()}>
              <KeyboardReturnIcon />
            </IconButton>
          )}
          <Avatar src={channel.receiver.avatarURL} />
          <Box>
            <Typography fontWeight="bold">{channel.receiver.fullName}</Typography>
            <Typography variant="caption">Available now</Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" flexDirection={'row'}>
          {messageThreadOptions.map((option, idx) => (
            <Fragment key={idx}>
              <IconButton sx={{ p: 0, m: 0.5 }}>{option.icon}</IconButton>
              <Divider orientation="vertical" sx={{ bgcolor: 'black' }} />
            </Fragment>
          ))}
        </Box>
      </Box>

      <Box flex={1} p={2} overflow="auto" display="flex" flexDirection="column" gap={2}>
        {messages.map((msg, idx) => {
          const isSender = msg.senderId === user.userId;
          return (
            <Box key={idx} display="flex" justifyContent={isSender ? 'flex-end' : 'flex-start'}>
              <Box
                maxWidth="70%"
                px={2}
                py={1}
                bgcolor={isSender ? '#e0e0e0' : '#9facac'}
                color={isSender ? 'blue' : 'black'}
                position="relative"
                sx={{ borderRadius: 2 }}
              >
                {Array.isArray(msg._assets) && (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollSnapType: 'x mandatory',
                        scrollBehavior: 'smooth',
                        width: 200,
                        borderRadius: 2,
                        mb: 1
                      }}
                    >
                      {msg._assets.map((asset, i) => (
                        <Box
                          key={i}
                          component={'img'}
                          src={asset.originalURL}
                          alt={`sent-${i}`}
                          sx={{
                            width: 200,
                            height: 200,
                            objectFit: 'cover',
                            scrollSnapAlign: 'start',
                            borderRadius: 2,
                            flexShrink: 0
                          }}
                        />
                      ))}
                    </Box>
                  </>
                )}
                <Typography variant="body2" color="var(--dark)">
                  {msg.message}
                </Typography>

                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={0.5}
                  mx={1}
                >
                  <Typography variant="caption" color="var(--dark)" sx={{ mr: 1 }}>
                    {moment(msg.createdAt).format('hh:mm')}
                  </Typography>

                  {msg.isExclusive && (
                    <Chip size="small" label={`${msg.price}$`} color="warning" variant="outlined" sx={{ ml: 1 }} />
                  )}

                  {isSender && (
                    <IconButton sx={{ p: 0, m: 0 }}>
                      <EditOutlinedIcon sx={{ width: 20, height: 20 }} color="info" />
                    </IconButton>
                  )}

                  <IconButton sx={{ p: 0, m: 0, ml: 1 }}>
                    <ReplyOutlinedIcon sx={{ width: 20, height: 20 }} color="info" />
                  </IconButton>

                  {!isSender && (
                    <IconButton sx={{ p: 0, m: 0, ml: 1 }}>
                      <AddReactionOutlinedIcon sx={{ width: 20, height: 20 }} color="action" />
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Box p={2} borderTop="1px solid ">
        <TextField
          placeholder=" Type a message..."
          fullWidth
          multiline
          maxRows={3}
          variant="outlined"
          sx={{ borderRadius: 2 }}
          slotProps={{
            input: {
              startAdornment: (
                <IconButton sx={{ p: 0, m: 0, mr: 2 }}>
                  <EmojiEmotionsOutlinedIcon />
                </IconButton>
              ),
              endAdornment: (
                <IconButton sx={{ p: 0, m: 0, mr: 2 }}>
                  <SendOutlinedIcon color="primary" />
                </IconButton>
              )
            }
          }}
        />
      </Box>
    </Box>
  );
}
