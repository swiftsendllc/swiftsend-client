import { CreatorAssetsEntity } from '@/hooks/entities/assets.entity';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FilterBAndWIcon from '@mui/icons-material/FilterBAndW';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import { Box, FormControl, IconButton, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { UploadModal } from './UploadModal';
export function Header({
  checkBox,
  setAssets,
  setCheckBox
}: {
  checkBox: boolean;
  setAssets: React.Dispatch<React.SetStateAction<CreatorAssetsEntity[]>>;
  setCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [uploadModal, setUploadModal] = useState<boolean>(false);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper elevation={0} sx={{ padding: { xs: '8px 16px', sm: '8px 32px' } }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ flexWrap: 'wrap' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              sx={{ mx: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
              Assets
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, maxWidth: 200, pr: 5 }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search Assets..."
                sx={{ backgroundColor: 'background.paper' }}
              />
            </Box>
            <FormControl size="small">
              <Select labelId="sort-label" label="Sort" sx={{ backgroundColor: 'background.paper' }}>
                <MenuItem value="name">By Name</MenuItem>
                <MenuItem value="date">By Date</MenuItem>
                <MenuItem value="size">By Size</MenuItem>
              </Select>
            </FormControl>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton edge="end" color="inherit" aria-label="filter">
                <FilterBAndWIcon />
              </IconButton>
              <IconButton edge="end" color="inherit" aria-label="upload" onClick={() => setUploadModal(true)}>
                <CloudUploadIcon />
              </IconButton>
              <IconButton edge="end" color="inherit" aria-label="checkbox" onClick={() => setCheckBox((prev) => !prev)}>
                {checkBox ? <CancelPresentationOutlinedIcon /> : <GradingOutlinedIcon />}
              </IconButton>
            </Stack>
          </Stack>
        </Paper>
        <UploadModal
          isOpen={uploadModal}
          onClose={() => setUploadModal(false)}
          onUpload={(asset) => setAssets((prev) => [...prev, asset])}
        />
      </Box>
    </>
  );
}
