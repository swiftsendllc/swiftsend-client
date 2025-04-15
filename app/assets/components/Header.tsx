import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FilterBAndWIcon from '@mui/icons-material/FilterBAndW';
import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
export function Header() {
  return (
    <>
      <Box sx={{ width: { xs: 'auto', md: '100%' } }}>
        <Paper elevation={0}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mx: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Assets
            </Typography>
            <Stack direction={'row'} justifyContent={'space-between'} marginRight={2} spacing={0.5}>
              <IconButton edge="end" color="inherit" aria-label="upload">
                <FilterBAndWIcon />
              </IconButton>
              <IconButton edge="end" color="inherit" aria-label="upload">
                <CloudUploadIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </>
  );
}
