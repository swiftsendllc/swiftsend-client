import { widths } from '@/components/SearchComponents';
import useAssetAPI from '@/hooks/api/useAssetAPI';
import { CreatorAssetsEntity } from '@/hooks/entities/assets.entity';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import { Box, Fab, Paper, Slider, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { UploadModal } from './UploadModal';

export function Header({
  checkBox,
  setAssets,
  setCheckBox,
  selectedAssetIds,
  setSelectedAssetIds,
  setWidth,
  onSelectTenAssets
}: {
  onSelectTenAssets: (selected: boolean) => unknown;
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
      setCheckBox(false);
    } catch (error) {
      console.error(error);
      toast.error('FAILED TO DELETE ASSETS!');
    }
  };

  const handleToggleSelect = () => {
    setSelectedAssetIds([]);
    setCheckBox((prev) => !prev);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper elevation={0} sx={{ padding: { xs: '8px 16px', sm: '8px 32px' } }}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
              🄰🅂🅂🄴🅃🅂
            </Typography>
            <Box width={150}>
              <Slider
                defaultValue={30}
                min={10}
                marks={widths}
                step={10}
                onChange={(_, value) => {
                  if (typeof value === 'number') {
                    setWidth(value);
                  }
                }}
              />
            </Box>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ flexWrap: 'wrap' }}>
            <Stack direction="row" spacing={1} alignItems="center">
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
                    Select 10
                  </Fab>
                </>
              )}
              <Fab variant="extended" aria-label="checkbox" onClick={handleToggleSelect}>
                {checkBox ? <CancelPresentationOutlinedIcon /> : <GradingOutlinedIcon />}
                {checkBox ? 'Cancel' : 'Select'}
              </Fab>
            </Stack>
            <Stack direction={'row'}>
              <Fab variant="extended" aria-label="upload" onClick={() => setUploadModal(true)}>
                <CloudUploadIcon />
                Upload
              </Fab>
            </Stack>
          </Stack>
        </Paper>
        <UploadModal
          isOpen={uploadModal}
          onClose={() => setUploadModal(false)}
          onUpload={(asset) => setAssets((prev) => [asset, ...prev])}
        />
      </Box>
    </>
  );
}
