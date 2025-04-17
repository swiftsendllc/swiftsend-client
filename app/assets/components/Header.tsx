import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FilterBAndWIcon from '@mui/icons-material/FilterBAndW';
import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { UploadModal } from './UploadModal';
export function Header() {
  const [uploadModal, setUploadModal] = useState<boolean>(false);

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
              <IconButton edge="end" color="inherit" aria-label="upload" onClick={() => setUploadModal(true)}>
                <CloudUploadIcon />
              </IconButton>
              <UploadModal isOpen={uploadModal} onClose={() => setUploadModal(false)} />
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </>
  );
}
