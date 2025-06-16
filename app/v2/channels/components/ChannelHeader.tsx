import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Chip, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export function ChannelHeader() {
  const router = useRouter();
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={1}>
        <Box display={'flex'} alignItems={'center'} gap={1}>
          <IconButton sx={{ p: 0, m: 0 }} onClick={() => router.back()}>
            <KeyboardReturnIcon />
          </IconButton>
          <Typography fontWeight="bold">CHANNELS</Typography>
        </Box>
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
    </>
  );
}
