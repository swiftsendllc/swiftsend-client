/* eslint-disable @next/next/no-img-element */
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Box, Typography } from '@mui/material';

export function NoChatSelected() {
  return (
    <Box
      flex={1}
      display="flex"
      alignContent="center"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      minHeight="100%"
      width={'100%'}
      minWidth={'340px'}
      borderRight="1px solid"
    >
      <ChatBubbleOutlineIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
      <Typography variant="h6" gutterBottom fontWeight={'bold'} color="text.secondary">
        Select a conversation
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign={'center'} maxWidth={'300px'}>
        Start by selecting a chat.Your messages will appear here
      </Typography>
    </Box>
  );
}
