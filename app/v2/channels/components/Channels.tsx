'use client';

import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography
} from '@mui/material';

const mockUsers = [
  { id: 1, name: 'Jane Chastity', lastMessage: 'are you here?🥵🥵🥵', avatar: 'https://i.pravatar.cc/150?img=1' },
  {
    id: 2,
    name: 'Amber May',
    lastMessage: 'Who wants to be my alpha daddy? 😘',
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: 3,
    name: 'Lola Wolfe',
    lastMessage: 'This college cutie joined and is ready! 🔥',
    avatar: 'https://i.pravatar.cc/150?img=3'
  }
];

export default function ChannelsPage() {
  return (
    <Box width="340px" borderRight="1px solid ">
      <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={1}>
        <Typography fontWeight="bold">CHANNELS</Typography>
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Box>
      <Box px={2} pb={1} display="flex" gap={1}>
        <Chip label="All" size="small" variant="outlined" />
        <Chip label="Priority" size="small" variant="outlined" />
        <Chip label="Unread" size="small" variant="outlined" />
      </Box>
      <TextField
        placeholder="Search..."
        fullWidth
        size="small"
        sx={{ px: 0, mb: 1 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }
        }}
      />
      <Divider sx={{ borderColor: 'black' }} />
      <List>
        {mockUsers.map((user) => (
          <>
            <ListItem
              key={user.id}
              sx={{
                transform: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: 1,
                '&hover': {
                  boxShadow: 5,
                  transform: 'scale(1.01)'
                }
              }}
            >
              <ListItemAvatar>
                <Avatar src={user.avatar} />
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.lastMessage} />
            </ListItem>
            <Divider sx={{ borderColor: 'black' }} />
          </>
        ))}
      </List>
    </Box>
  );
}
