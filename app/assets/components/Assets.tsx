'use client';

import useAssetAPI from '@/hooks/api/useAssetAPI';
import { CreatorAssetsEntity } from '@/hooks/entities/assets.entity';
import { Container, List, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AssetFeed } from './AssetFeed';
import { Header } from './Header';

export default function AssetsPage() {
  const [assets, setAssets] = useState<CreatorAssetsEntity[]>([]);
  const { getCreatorAssets } = useAssetAPI();
  const [checkbox, setCheckBox] = useState<boolean>(false);
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [width, setWidth] = useState<number>(30);

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
    if (hasSelected) {
      setSelectedAssetIds(selectedAssets.map((asset) => asset.assetId));
      console.log('assets id', selectedAssetIds);
    } else {
      setSelectedAssetIds([]);
    }
  };

  return (
    <>
      <Container sx={{ p: 0, mt: 2, pl: { xs: 0, md: 24 }, position: 'fixed' }}>
        <Header
          setAssets={setAssets}
          setCheckBox={setCheckBox}
          checkBox={checkbox}
          selectedAssetIds={selectedAssetIds}
          setSelectedAssetIds={setSelectedAssetIds}
          setWidth={setWidth}
          onSelectTenAssets={handleSelectTenAssets}
        />
        {!assets.length ? (
          <Typography variant="h5" textAlign={'center'} justifyContent={'center'}>
            You assets will appear here
          </Typography>
        ) : (
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
              checkbox={checkbox}
              selectedAssetIds={selectedAssetIds}
              setSelectedAssetIds={setSelectedAssetIds}
              width={width}
            />
          </List>
        )}
      </Container>
    </>
  );
}
