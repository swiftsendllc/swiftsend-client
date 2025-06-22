import { CreatorAssetsEntity } from '@/hooks/entities/assets.entity';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { Box, Checkbox, Dialog, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cluster } from 'radash';
import { useState } from 'react';
import { ForwardDrawer } from './ForwardDrawer';

interface AssetFeedProps {
  checkBox: boolean;
  assets: CreatorAssetsEntity[];
  selectedAssetsMap: Map<string, string[]>;
  setSelectedAssetsMap: React.Dispatch<React.SetStateAction<Map<string, string[]>>>;
}

export function AssetFeed({ assets, setSelectedAssetsMap, selectedAssetsMap, checkBox }: AssetFeedProps) {
  const theme = useTheme();
  const assetGroups = cluster(assets, 3);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [assetDialogOpen, setAssetDialogOpen] = useState<boolean>(false);
  const [assetUrl, setAssetUrl] = useState<string | null>(null);
  const [forwardDrawer, setForwardDrawer] = useState<boolean>(false);

  const handleSelectAsset = (asset_url: string) => {
    setAssetUrl(asset_url);
    setAssetDialogOpen(true);
  };

  const handleToggleAssetSelection = async (asset: CreatorAssetsEntity) => {
    const urls = asset._assets.map((asst) => asst.originalURL);
    setSelectedAssetsMap((prev) => {
      const newAssetMap = new Map(prev);
      if (newAssetMap.has(asset.assetId)) newAssetMap.delete(asset.assetId);
      else newAssetMap.set(asset.assetId, urls);
      return newAssetMap;
    });
  };

  const handleClose = () => {
    setAssetDialogOpen(false);
    setAssetUrl(null);
  };

  return (
    <Box display={'flex'} flexDirection={'column'} minHeight={'100%'}>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        gap={1}
        paddingTop={2}
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
                    xs: `${25}%`,
                    sm: `${30}%`,
                    md: `${20}%`
                  },
                  aspectRatio: '4 / 3',
                  borderRadius: 2,
                  overflow: 'hidden',
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
                <FullscreenIcon sx={{ position: 'absolute', p: 0, m: 0, top: 1, left: 1, color:"white" }} />
                <Image
                  src={asst.originalURL}
                  alt="assets"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                  priority
                />
                {checkBox && (
                  <Checkbox
                    id={`asset-checkbox-${asset.assetId}`}
                    name={`asset-checkbox-${asset.assetId}`}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    checked={selectedAssetsMap.has(asset.assetId)}
                    onChange={() => {
                      handleToggleAssetSelection(asset);
                    }}
                    sx={{ p: 0, m: 0, top: 1, right: 1, position: 'absolute', color: 'white' }}
                  />
                )}
              </Box>
            ))
          )
        )}
      </Stack>

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
          {assetUrl && (
            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
              <Image src={assetUrl} alt="assets" fill style={{ objectFit: 'contain' }} sizes="100vw" priority />
            </Box>
          )}
        </Box>
      </Dialog>
      <ForwardDrawer isOpen={forwardDrawer} onClose={() => setForwardDrawer(false)} />
    </Box>
  );
}
