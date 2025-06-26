import { UserContext } from '@/hooks/context/user-context';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { Box, Button, Chip, IconButton, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';

interface MessageThreadFormattedProps {
  message: MessagesEntity;
  setDeleteMessage: React.Dispatch<React.SetStateAction<MessagesEntity | null>>;
  setPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEditMessage: React.Dispatch<React.SetStateAction<MessagesEntity | null>>;
  setReply: React.Dispatch<React.SetStateAction<MessagesEntity | null>>;
  messageRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  setSelectedMessage: React.Dispatch<React.SetStateAction<MessagesEntity | null>>;
}

export function MessageThreadBoxFormatted({
  message,
  setReply,
  messageRefs,
  setDeleteMessage,
  setPaymentModal,
  setSelectedMessage,
  setEditMessage
}: MessageThreadFormattedProps) {
  const msgLen = message.message.length;
  const [user] = useContext(UserContext);
  const isSender = message.senderId === user.userId;
  const purchased = message.purchasedBy.includes(user.userId);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isHighLighted, setIsHighLighted] = useState<boolean>(false);
  const [options, setOptions] = useState<boolean>(false);

  const formatMessage = (textMessage: string, isExp: boolean) => {
    if (isExp) return textMessage;
    else if (textMessage.length > 90) return textMessage.slice(0, 90) + '...';
    else return textMessage;
  };
  const formattedMessage = formatMessage(message.message, isExpanded);

  const formatDate = (msg: MessagesEntity) => {
    if (msg.deleted) return msg.deletedAt;
    else if (msg.edited) return msg.editedAt;
    else return msg.createdAt;
  };

  const showMessageState = (msg: MessagesEntity) => {
    if (msg.deleted) return 'deleted: ';
    else if (msg.edited) return 'edited: ';
    else return null;
  };

  const handleChipLabel = () => {
    if (message.isPurchased) return 'Unlocked';
    else return `$${message.price}`;
  };

  const handleScrollToRepliedToMessage = (messageId: string) => {
    const element = messageRefs.current[messageId];
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const highLightEvent = new CustomEvent('highlight-message', { detail: { id: messageId } });
    window.dispatchEvent(highLightEvent);
  };

  useEffect(() => {
    const handleHighLight = (event: CustomEvent) => {
      if (event.detail.id === message._id) {
        setIsHighLighted(true);
        setTimeout(() => setIsHighLighted(false), 1500);
      }
    };
    window.addEventListener('highlight-message', handleHighLight as EventListener);
    return () => {
      window.removeEventListener('highlight-message', handleHighLight as EventListener);
    };
  }, [message._id]);

  useEffect(() => {
    const ref = messageRefs.current;
    return () => {
      delete ref[message._id];
    };
  }, [messageRefs, message._id]);

  return (
    <Box
      ref={(el: HTMLDivElement | null) => {
        messageRefs.current[message._id] = el;
      }}
      onMouseEnter={() => setOptions(true)}
      onMouseLeave={() => setOptions(false)}
      maxWidth="70%"
      px={2}
      py={1}
      bgcolor={'#6c756e'}
      border={'1px solid #80996d'}
      position="relative"
      sx={{
        borderRadius: 2,
        transition: 'all 0.3s ease-in-out',
        boxShadow: isHighLighted ? '0 0 10px 4px rgb(245, 248, 247)' : 'none'
      }}
    >
      {/* For Exclusive message post */}
      {Array.isArray(message._assets) && (
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
          {message._assets.map((asset, i) => {
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
                <Box position={'absolute'} bottom={1} right={1}>
                  <Typography variant="caption" color="var(--dark)">
                    {`${i + 1}/${message._assets.length}`}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
      <Stack direction={'column'} maxWidth={200}>
        {message.isExclusive && !purchased && (
          <Button
            sx={{
              bgcolor: 'rgba(0,0,0,0.7)',
              color: 'white'
            }}
            onClick={() => {
              setSelectedMessage(message);
              setPaymentModal(true);
            }}
          >
            <LockIcon sx={{ fontSize: 28, color: 'black' }} />
            {`$${message.price}`}
          </Button>
        )}

        {/* message typography */}
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography
            variant="body2"
            color="var(--dark)"
            textAlign={'left'}
            fontStyle={message.deleted ? 'italic' : 'normal'}
          >
            {formattedMessage}
            {msgLen > 90 && (
              <IconButton sx={{ p: 0, m: 0 }} onClick={() => setIsExpanded((prev) => !prev)}>
                {isExpanded ? (
                  <ExpandLessIcon sx={{ cursor: 'pointer' }} />
                ) : (
                  <ExpandMoreIcon sx={{ cursor: 'pointer' }} />
                )}
              </IconButton>
            )}
          </Typography>
          {message.repliedToMessage && !message.deleted && (
            <Box
              sx={{
                cursor: 'pointer',
                border: '1px solid',
                width: 100,
                borderRadius: 2
              }}
              onClick={() => handleScrollToRepliedToMessage(message.repliedToMessage._id)}
            >
              <Typography variant="caption" color="var(--dark)" fontStyle={'italic'} sx={{ p: 0, m: 0 }}>
                Replied: {message.repliedToMessage.message.slice(0, 10)}...
              </Typography>
            </Box>
          )}
        </Stack>
      </Stack>

      {/* message crud options */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={0.5} mx={0}>
        <Typography
          variant="caption"
          color="var(--dark)"
          sx={{ mr: 1 }}
          fontStyle={message.deleted ? 'italic' : 'normal'}
        >
          {showMessageState(message)}
          {moment(formatDate(message)).format('hh:mm')}
        </Typography>
        {!message.deleted && options && (
          <Box>
            {message.isExclusive && (
              <Chip
                size="small"
                label={handleChipLabel()}
                color={'default'}
                variant="filled"
                sx={{ ml: 1 }}
                icon={message.isPurchased ? <PriceCheckIcon /> : <MoneyOffIcon />}
              />
            )}
            {isSender && (
              <IconButton sx={{ p: 0, m: 0 }} onClick={() => setEditMessage(message)}>
                <EditOutlinedIcon sx={{ width: 20, height: 20 }} color="info" />
              </IconButton>
            )}
            {isSender && (
              <IconButton sx={{ p: 0, mx: 1 }} onClick={() => setDeleteMessage(message)}>
                <DeleteIcon sx={{ width: 20, height: 20 }} color="info" />
              </IconButton>
            )}
            <IconButton sx={{ p: 0, mx: 1 }} onClick={() => setReply(message)}>
              <ReplyOutlinedIcon sx={{ width: 20, height: 20 }} color="info" />
            </IconButton>
            {!isSender && (
              <IconButton sx={{ p: 0, mx: 1 }}>
                <AddReactionOutlinedIcon sx={{ width: 20, height: 20 }} color="action" />
              </IconButton>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
