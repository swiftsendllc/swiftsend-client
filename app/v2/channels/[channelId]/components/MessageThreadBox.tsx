import { UserContext } from '@/hooks/context/user-context';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LockIcon from '@mui/icons-material/Lock';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { Box, Button, Chip, IconButton, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { useContext } from 'react';

interface MessageThreadProps {
  groupedMessages: [string, MessagesEntity[]][];
  setPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMessage: React.Dispatch<React.SetStateAction<MessagesEntity | null>>;
}

export function MessageThreadBox({ groupedMessages, setPaymentModal, setSelectedMessage }: MessageThreadProps) {
  const [user] = useContext(UserContext);

  const formatDate = (date: Date | string) => {
    const now = moment();
    const targetDate = moment(date);
    if (targetDate.isSame(now, 'day')) return 'Today';
    else if (targetDate.isSame(now.subtract(1, 'day'), 'day')) return 'Yesterday';
    return targetDate.format('DD-MM-YYYY');
  };

  return (
    <Box flex={1} p={2} overflow="auto" display="flex" flexDirection="column-reverse" gap={2}>
      {groupedMessages.map(([date, _messages]) => {
        return (
          <Box display="flex" key={date} gap={1} flexDirection="column">
            <Box
              position="relative"
              sx={{
                bgcolor: 'grey',
                borderRadius: 2,
                mx: 'auto',
                transition: 'all 0.3s ease-in-out',
                minWidth: '30%',
                '&:hover': {
                  transform: 'scale(1.05)',
                  backgroundColor: 'primary.main'
                },
              }}
            >
              <Typography textAlign="center">{formatDate(date)}</Typography>
            </Box>
            <Box display="flex" key={date} gap={1} flexDirection="column-reverse">
              {_messages.map((msg, idx) => {
                const isSender = msg.senderId === user.userId;
                const purchased = msg.purchasedBy.includes(user.userId);
                return (
                  <Box key={idx} display="flex" justifyContent={isSender ? 'flex-end' : 'flex-start'}>
                    <Box
                      maxWidth="70%"
                      px={2}
                      py={1}
                      bgcolor={isSender ? '#e0e0e0' : '#9facac'}
                      color={isSender ? 'blue' : 'black'}
                      position="relative"
                      sx={{
                        borderRadius: 2,
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          backgroundColor: 'primary.main'
                        }
                      }}
                    >
                      {Array.isArray(msg._assets) && (
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
                          {msg._assets.map((asset, i) => {
                            return (
                              <Box
                                key={i}
                                sx={{
                                  position: 'relative',
                                  width: 200,
                                  height: 200,
                                  flexShrink: 0,
                                  borderRadius: 2,
                                  overflow: 'hidden',
                                  scrollSnapAlign: 'start'
                                }}
                              >
                                <Box
                                  component="img"
                                  src={asset.originalURL}
                                  alt={`sent-${i}`}
                                  sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'filter 0.3s ease'
                                  }}
                                />
                              </Box>
                            );
                          })}
                        </Box>
                      )}
                      <Stack direction={'column'} maxWidth={200}>
                        {msg.isExclusive && !purchased && (
                          <Button
                            sx={{
                              bgcolor: 'rgba(0,0,0,0.7)',
                              color: 'white'
                            }}
                            onClick={() => {
                              setSelectedMessage(msg);
                              setPaymentModal(true);
                            }}
                          >
                            <LockIcon sx={{ fontSize: 28, color: 'black' }} />
                            {`$${msg.price}`}
                          </Button>
                        )}
                        <Typography variant="body2" color="var(--dark)" textAlign={"left"}>
                          {msg.message}
                        </Typography>
                      </Stack>

                      <Box display="flex" justifyContent="space-between" alignItems="center" mt={0.5} mx={1}>
                        <Typography variant="caption" color="var(--dark)" sx={{ mr: 1 }}>
                          {moment(msg.createdAt).format('hh:mm')}
                        </Typography>

                        {msg.isExclusive && (
                          <Chip
                            size="small"
                            label={msg.isPurchased ? 'Unlocked' : `$${msg.price}`}
                            color={'default'}
                            variant="outlined"
                            sx={{ ml: 1 }}
                          />
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
          </Box>
        );
      })}
    </Box>
  );
}
