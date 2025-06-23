import { UserContext } from '@/hooks/context/user-context';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { Box, Button, Chip, IconButton, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React, { useContext, useState } from 'react';

interface MessageThreadFormattedProps {
  msg: MessagesEntity;
  setPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMessage: React.Dispatch<React.SetStateAction<MessagesEntity | null>>;
}

export function MessageThreadBoxFormatted({ msg, setSelectedMessage, setPaymentModal }: MessageThreadFormattedProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const formatMessage = (textMessage: string, isExp: boolean) => {
    if (isExp) return textMessage;
    else if (textMessage.length > 90) return textMessage.slice(0, 90) + '...';
    else return textMessage;
  };

  const handleChipLabel = () => {
    if (msg.isPurchased) return 'Unlocked';
    else return `$${msg.price}`;
  };

  const msgLen = msg.message.length;
  const [user] = useContext(UserContext);
  const isSender = msg.senderId === user.userId;
  const purchased = msg.purchasedBy.includes(user.userId);
  const formattedMessage = formatMessage(msg.message, isExpanded);

  return (
    <Box
      maxWidth="70%"
      px={2}
      py={1}
      bgcolor={isSender ? '#6c756e' : '#9facac'}
      border={'1px solid #80996d'}
      position="relative"
      sx={{
        borderRadius: 2,
        transition: 'all 0.3s ease-in-out',
        '&:hover': { transform: 'scale(1.05)' }
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
        <Typography variant="body2" color="var(--dark)" textAlign={'left'}>
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
      </Stack>

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={0.5} mx={1}>
        <Typography variant="caption" color="var(--dark)" sx={{ mr: 1 }}>
          {moment(msg.createdAt).format('hh:mm')}
        </Typography>

        {msg.isExclusive && (
          <Chip
            size="small"
            label={handleChipLabel()}
            color={'default'}
            variant="filled"
            sx={{ ml: 1 }}
            icon={msg.isPurchased ? <PriceCheckIcon /> : <MoneyOffIcon />}
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
  );
}
