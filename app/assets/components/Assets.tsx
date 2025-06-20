'use client';

import useAssetAPI from '@/hooks/api/useAssetAPI';
import { CreatorAssetsEntity } from '@/hooks/entities/assets.entity';
import { Box, List, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AssetFeed } from './AssetFeed';
import { AssetOptions } from './AssetOptions';

export default function AssetsPage() {
  const [assets, setAssets] = useState<CreatorAssetsEntity[]>([]);
  const { getCreatorAssets } = useAssetAPI();
  const [checkbox, setCheckBox] = useState<boolean>(false);
  const [selectedAssetsMap, setSelectedAssetsMap] = useState<Map<string, string[]>>(new Map());

  const loadAssets = async () => {
    try {
      const assetData = await getCreatorAssets();
      setAssets(assetData);
    } catch (error) {
      console.error(error);
      toast.error('FAILED TO LOAD ASSETS!');
    }
  };
  useEffect(() => {
    loadAssets();
  }, []); // eslint-disable-line

  const handleSelectTenAssets = (hasSelected: boolean) => {
    const selectedAssets = assets.slice(0, 10);
    const newAssetMap = new Map<string, string[]>();
    if (hasSelected)
      for (const asset of selectedAssets) {
        const urls = asset._assets.map((asst) => asst.originalURL);
        newAssetMap.set(asset.assetId, urls);
      }
    setSelectedAssetsMap(newAssetMap);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      fontFamily="Arial, sans-serif"
      sx={{ minWidth: 0, overflow: 'hidden' }}
    >
      <AssetOptions
        setAssets={setAssets}
        setCheckBox={setCheckBox}
        checkBox={checkbox}
        selectedAssetsMap={selectedAssetsMap}
        setSelectedAssetsMap={setSelectedAssetsMap}
        onSelectTenAssets={handleSelectTenAssets}
      />
      {!assets.length ? (
        <Typography variant="h5" textAlign="center" justifyContent="center">
          No assets to display
        </Typography>
      ) : (
        <Box borderRight="1px solid">
          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '800px',
              objectFit: 'contain',
              overflowY: 'scroll'
            }}
            id="scroll-d"
          >
            <AssetFeed
              assets={assets}
              checkBox={checkbox}
              setSelectedAssetsMap={setSelectedAssetsMap}
              selectedAssetsMap={selectedAssetsMap}
            />
          </List>
        </Box>
      )}
    </Box>
  );
}
