import useAssetAPI from '@/hooks/api/useAssetAPI';
import { CreatorAssetsEntity } from '@/hooks/entities/assets.entity';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FilterListIcon from '@mui/icons-material/FilterList';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Chip, Divider, Fab, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { UploadModal } from './UploadModal';

interface HeaderProps {
  onSelectTenAssets: (selected: boolean) => unknown;
  checkBox: boolean;
  setAssets: React.Dispatch<React.SetStateAction<CreatorAssetsEntity[]>>;
  setCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedAssetsMap: React.Dispatch<React.SetStateAction<Map<string, string[]>>>;
  selectedAssetsMap: Map<string, string[]>;
}

export function AssetOptions({
  checkBox,
  setAssets,
  setCheckBox,
  onSelectTenAssets,
  setSelectedAssetsMap,
  selectedAssetsMap
}: HeaderProps) {
  const [uploadModal, setUploadModal] = useState<boolean>(false);
  const { deleteCreatorAssets } = useAssetAPI();
  const selectedAssetIds = Array.from(selectedAssetsMap.keys());

  const handleDeleteCreatorAssets = async () => {
    try {
      await deleteCreatorAssets({ assetIds: selectedAssetIds });
      setAssets((prev) => prev.filter((asset) => !selectedAssetIds.includes(asset.assetId)));
      toast.success(`DELETED ${selectedAssetIds.length} ASSETS`);
      setSelectedAssetsMap(new Map());
      setCheckBox(false);
    } catch (error) {
      console.error(error);
      toast.error('FAILED TO DELETE ASSETS!');
    }
  };

  const handleToggleSelect = () => {
    setSelectedAssetsMap(new Map());
    setCheckBox((prev) => !prev);
  };

  return (
    <Box display={'flex'} flexDirection={'column'} borderRight={'1px solid'} flex={1} flexGrow={'inherit'}>
      <Box display="flex" flexDirection={'row'} justifyContent="space-between" alignItems="center" px={2} py={1}>
        <Typography fontWeight="bold">ASSETS</Typography>
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Box>
      <Box px={2} pb={1} display="flex" gap={1}>
        <Chip label="All" size="small" variant="outlined" />
        <Chip label="NSFW" size="small" variant="outlined" />
        <Chip label="Free" size="small" variant="outlined" />
      </Box>
      <Box>
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
      </Box>
      <Divider sx={{ borderColor: 'black' }} />
      <Box sx={{ padding: { xs: '8px 16px', sm: '8px 32px' } }}>
        <Box
          display={'flex'}
          flexDirection={'row'}
          justifyContent="space-between"
          alignItems="center"
          sx={{ flexWrap: 'wrap' }}
        >
          <Box display={'flex'} flexDirection={'row'} alignItems="center">
            {checkBox && (
              <>
                <Fab
                  variant="extended"
                  color="error"
                  aria-label="filter"
                  onClick={handleDeleteCreatorAssets}
                  disabled={!selectedAssetIds.length}
                >
                  <LayersClearIcon />
                  Delete
                </Fab>
                <Fab
                  variant="extended"
                  color={!selectedAssetIds.length ? 'default' : 'primary'}
                  aria-label="filter-select"
                  onClick={() => onSelectTenAssets(!selectedAssetIds.length)}
                >
                  <DoneAllIcon />
                  {!selectedAssetIds.length ? "Select 10" : "Deselect"}
                </Fab>
              </>
            )}
            <Fab variant="extended" aria-label="checkbox" onClick={handleToggleSelect}>
              {checkBox ? <CancelPresentationOutlinedIcon /> : <GradingOutlinedIcon />}
              {checkBox ? 'Cancel' : 'Select'}
            </Fab>
          </Box>
          <Stack direction={'row'}>
            <Fab variant="extended" aria-label="upload" onClick={() => setUploadModal(true)}>
              <CloudUploadIcon />
              Upload
            </Fab>
          </Stack>
        </Box>
      </Box>
      <Divider sx={{ borderColor: 'black' }} />

      <UploadModal
        isOpen={uploadModal}
        onClose={() => setUploadModal(false)}
        onUpload={(asset) => setAssets((prev) => [asset, ...prev])}
      />
    </Box>
  );
}
