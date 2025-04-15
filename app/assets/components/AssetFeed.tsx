import { CreatorAssetsEntity } from '@/hooks/entities/assets.entity';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cluster } from 'radash';
import { useState } from 'react';

export function AssetFeed({ assets }: { assets: CreatorAssetsEntity[] }) {
  const theme = useTheme();
  const assetGroups = cluster(assets, 3);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [assetDialogOpen, setAssetDialogOpen] = useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const handleSelectAsset = (assetUrl: string) => {
    setSelectedAsset(assetUrl);
    setAssetDialogOpen(true);
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
        padding={2}
        marginBottom={isSmallScreen ? 40 : 15}
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
                    xs: '40%',
                    sm: '48%',
                    md: '30%'
                  },
                  aspectRatio: '4 / 3',
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: 'pointer',
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
          {selectedAsset && (
            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
              <Image src={selectedAsset} alt="assets" fill style={{ objectFit: 'contain' }} sizes="100vw" priority />
            </Box>
          )}
        </Box>
      </Dialog>
    </>
  );
}
