import { CreatorAssetsEntity } from '@/hooks/entities/assets.entity';
import CloseIcon from '@mui/icons-material/Close';
import MemoryIcon from '@mui/icons-material/Memory';
import { Box, Checkbox, Dialog, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cluster } from 'radash';
import React, { useState } from 'react';
import { ForwardDrawer } from './ForwardDrawer';

interface AssetFeedProps {
  assets: CreatorAssetsEntity[];
  checkbox: boolean;
  width: number;
  selectedAssetIds: string[];
  setSelectedAssetIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export function AssetFeed({ assets, checkbox, selectedAssetIds, setSelectedAssetIds, width }: AssetFeedProps) {
  const theme = useTheme();
  const assetGroups = cluster(assets, 3);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [assetDialogOpen, setAssetDialogOpen] = useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [forwardDrawer, setForwardDrawer] = useState<boolean>(false);

  const handleSelectAsset = (assetUrl: string) => {
    setSelectedAsset(assetUrl);
    setAssetDialogOpen(true);
  };

  const handleToggleCheckBox = async (assetId: string) => {
    setSelectedAssetIds((prev) => {
      const newAssetIds = prev.includes(assetId) ? prev.filter((id) => id !== assetId) : [...prev, assetId];
      return newAssetIds;
    });
  };

  const handleClose = () => {
    setAssetDialogOpen(false);
    setSelectedAsset(null);
  };

  return (
    <>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        gap={2}
        paddingTop={2}
        width={"auto"}
        marginBottom={isSmallScreen ? 45 : 25}
      >
        {assetGroups.map((groups, groupIdx) =>
          groups.map((asset, astIdx) =>
            asset._assets.map((asst, idx) => (
              <Box
                key={`${groupIdx}-${idx}-${astIdx}`}
                onClick={() => handleSelectAsset(asst.originalURL)}
                sx={{
                  position: 'relative',
                  width: {
                    xs: `${width}%`,
                    sm: `${width}%`,
                    md: `${width}%`
                  },
                  aspectRatio: '4 / 3',
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column-reverse',
                  boxShadow: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'scale(1.01)'
                  }
                }}
              >
                <Image
                  src={asst.originalURL}
                  alt="assets"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                  priority
                />
                {checkbox && (
                  <Checkbox
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    checked={selectedAssetIds.includes(asset.assetId)}
                    onChange={() => {
                      handleToggleCheckBox(asset.assetId);
                    }}
                  />
                )}
                <IconButton
                  sx={{ top: 1, right: 1, position: 'absolute', color: 'inherit' }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <MemoryIcon />
                </IconButton>
              </Box>
            ))
          )
        )}
      </Stack>
      {/* big screen */}
      <Dialog open={assetDialogOpen} onClose={handleClose} maxWidth="md" fullWidth>
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          sx={{
            position: 'relative',
            width: '100%',
            height: isSmallScreen ? '60vh' : '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black'
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              top: 8,
              right: 8,
              zIndex: 10,
              position: 'absolute',
              bgcolor: 'whitesmoke'
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedAsset && (
            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
              <Image src={selectedAsset} alt="assets" fill style={{ objectFit: 'contain' }} sizes="100vw" priority />
            </Box>
          )}
        </Box>
      </Dialog>
      <ForwardDrawer isOpen={forwardDrawer} onClose={() => setForwardDrawer(false)} />
    </>
  );
}
