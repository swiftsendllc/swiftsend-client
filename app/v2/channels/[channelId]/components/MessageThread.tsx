import { UserContext } from '@/hooks/context/user-context';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Avatar, Box, Chip, IconButton, TextField, Typography } from '@mui/material';
import moment from 'moment';
import { useContext } from 'react';

interface MessageProps {
  messages: MessagesEntity[];
}

export function MessageThread({ messages }: MessageProps) {
  const [user] = useContext(UserContext)
  return (
    <Box
      flex={1}
      display="flex"
      flexDirection="column"
      minWidth={0}
      width="auto"
      borderRight="1px solid "
      height="100vh"
    >
      <Box px={2} py={1} borderBottom="1px solid " display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar src={user.avatarURL} />
          <Box>
            <Typography fontWeight="bold">{user.fullName}</Typography>
            <Typography variant="caption">Available now</Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton>
            <StarBorderIcon />
          </IconButton>
          <IconButton>
            <NotificationsNoneIcon />
          </IconButton>
          <IconButton>
            <PushPinOutlinedIcon />
          </IconButton>
          <IconButton>
            <PhotoLibraryOutlinedIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
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
                bgcolor={isSender ? '#e0e0e0' : '#9facac  '}
                color={isSender ? 'blue' : 'black'}
                position="relative"
                sx={{ borderRadius: 2 }}
              >
                <Typography variant="body2" color="var(--dark)">
                  {msg.message}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={0.5}>
                  <Typography variant="caption" color="var(--dark)">
                    {moment(msg.createdAt).format('hh:mm')}
                  </Typography>
                  {!msg.isExclusive && (
                    <Chip size="small" label="$5" color="warning" variant="outlined" sx={{ ml: 1 }} />
                  )}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Box p={2} borderTop="1px solid ">
        <TextField
          placeholder="Type a message..."
          fullWidth
          multiline
          maxRows={3}
          variant="outlined"
          sx={{ borderRadius: 2 }}
        />
      </Box>
    </Box>
  );
}
