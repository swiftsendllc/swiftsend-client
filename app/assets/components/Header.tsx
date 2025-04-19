import { widths } from '@/components/SearchComponents';
import useAssetAPI from '@/hooks/api/useAssetAPI';
import { CreatorAssetsEntity } from '@/hooks/entities/assets.entity';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import { Box, IconButton, Paper, Slider, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { UploadModal } from './UploadModal';

export function Header({
  checkBox,
  setAssets,
  setCheckBox,
  selectedAssetIds,
  setSelectedAssetIds,
  setWidth
}: {
  checkBox: boolean;
  setAssets: React.Dispatch<React.SetStateAction<CreatorAssetsEntity[]>>;
  setCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAssetIds: string[];
  setSelectedAssetIds: React.Dispatch<React.SetStateAction<string[]>>;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [uploadModal, setUploadModal] = useState<boolean>(false);
  const { deleteCreatorAssets } = useAssetAPI();

  const handleDeleteCreatorAssets = async () => {
    try {
      await deleteCreatorAssets({ assetIds: selectedAssetIds });
      setAssets((prev) => prev.filter((asset) => !selectedAssetIds.includes(asset.assetId)));
      toast.success(`DELETED ${selectedAssetIds.length} ASSETS`);
      setCheckBox(false)
    } catch (error) {
      console.error(error);
      toast.error('FAILED TO DELETE ASSETS!');
    }
  };

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

            <Box sx={{ display: { xs: 'none', sm: 'block' }, maxWidth: 200, pr: 1 }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search Assets..."
                sx={{ backgroundColor: 'background.paper', pr: 5 }}
              />
            </Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Slider
                defaultValue={30}
                min={10}
                marks={widths}
                step={10}
                sx={{ width: 150 }}
                onChange={(_, value) => {
                  if (typeof value === 'number') {
                    setWidth(value);
                  }
                }}
              />
              {checkBox && (
                <IconButton edge="end" color="error" aria-label="filter" onClick={handleDeleteCreatorAssets}>
                  <LayersClearIcon />
                </IconButton>
              )}
              <IconButton edge="end" color="inherit" aria-label="upload" onClick={() => setUploadModal(true)}>
                <CloudUploadIcon />
              </IconButton>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="checkbox"
                onClick={() => {
                  setSelectedAssetIds([]);
                  setCheckBox((prev) => !prev);
                }}
              >
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
