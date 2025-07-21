'use client';
import { AssetFeed } from '@/app/assets/components/AssetFeed';
import useAssetAPI from '@/hooks/api/useAssetAPI';
import { CreatorAssetsEntity } from '@/hooks/entities/assets.entity';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import { Box, Drawer, Fab, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface SendAssetsBoxProps {
  selectedAssetsMap: Map<string, string[]>;
  setSelectedAssetsMap: React.Dispatch<React.SetStateAction<Map<string, string[]>>>;
}

export function SendAssetsBox({ selectedAssetsMap, setSelectedAssetsMap }: SendAssetsBoxProps) {
  const { getCreatorAssets } = useAssetAPI();
  const [assets, setAssets] = useState<CreatorAssetsEntity[]>([]);
  const [checkBox, setCheckBox] = useState<boolean>(false);

  const selectedAssetIds = Array.from(selectedAssetsMap.keys());

  const loadAssets = async () => {
    try {
      const _assets = await getCreatorAssets();
      setAssets(_assets);
    } catch (error) {
      console.error(error);
      toast.error('FAILED TO LOAD ASSETS!');
    }
  };

  useEffect(() => {
    loadAssets();
  }, []); //eslint-disable-line

  const handleToggleSelect = () => {
    setCheckBox((prev) => !prev);
    setSelectedAssetsMap(new Map());
  };

  const handleSelectTenAssets = (hasSelected: boolean) => {
    const selectedAssets = assets.slice(0, 10);
    const newAssetMap = new Map<string, string[]>();
    if (hasSelected) {
      for (const asset of selectedAssets) {
        const urls = asset._assets.map((asst) => asst.originalURL);
        newAssetMap.set(asset.assetId, urls);
      }
      setSelectedAssetsMap(newAssetMap);
    } else setSelectedAssetsMap(new Map());
  };

  return (
    <>
      <Drawer
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 500,
            height: '100vh',
            boxSizing: 'border-box'
          }
        }}
        variant="permanent"
        anchor="right"
      >
        <Box sx={{ position: 'fixed', zIndex: 100, width: 500, p: 0, mr: 5 }}>
          <Paper sx={{ width: '100%' }}>
            <Stack direction={'column'}>
              <Stack direction={'row'} justifyContent={'space-between'} alignContent={'center'} alignItems={'center'}>
                <Typography variant="h6" fontWeight="bold">
                  🄰🅂🅂🄴🅃🅂
                </Typography>
                <Fab color={!selectedAssetIds.length ? 'default' : 'primary'} aria-label="filter-select">
                  {selectedAssetIds.length}
                </Fab>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ flexWrap: 'wrap' }}
                spacing={1}
                mt={1}
              >
                {checkBox && (
                  <>
                    <Fab
                      variant="extended"
                      color={!selectedAssetIds.length ? 'default' : 'primary'}
                      aria-label="filter-select"
                      onClick={() => handleSelectTenAssets(!selectedAssetIds.length)}
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
            </Stack>
          </Paper>
        </Box>
        <Box paddingTop={20}>
          <AssetFeed
            assets={assets}
            checkBox={checkBox}
            selectedAssetsMap={selectedAssetsMap}
            setSelectedAssetsMap={setSelectedAssetsMap}
          />
        </Box>
      </Drawer>
    </>
  );
}
