'use client';

import { AssetFeed } from '@/app/assets/components/AssetFeed';
import useAssetAPI from '@/hooks/api/useAssetAPI';
import { CreatorAssetsEntity } from '@/hooks/entities/assets.entity';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import CollectionsIcon from '@mui/icons-material/Collections';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FilterListIcon from '@mui/icons-material/FilterList';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PaidIcon from '@mui/icons-material/Paid';
import SendIcon from '@mui/icons-material/Send';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Chip, Divider, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function MessageAssetAndAnalyticsBar() {
  const { getCreatorAssets } = useAssetAPI();
  const [assets, setAssets] = useState<CreatorAssetsEntity[]>([]);
  const [checkBox, setCheckBox] = useState<boolean>(false);
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [, setSearchTerm] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const loadCreatorAssets = async () => {
    try {
      const fetchedAssets = await getCreatorAssets();
      setAssets(fetchedAssets);
    } catch (error) {
      console.error(error);
      toast.error('FAILED TO LOAD CREATOR ASSETS!');
    }
  };

  const handleSelectTenAssets = (hasSelected: boolean) => {
    const selectedAssets = assets.slice(0, 10);
    if (hasSelected) setSelectedAssetIds(selectedAssets.map((_asset) => _asset.assetId));
    else setSelectedAssetIds([]);
  };

  const handleToggleSelect = () => {
    setSelectedAssetIds([]);
    setCheckBox((prev) => !prev);
  };

  const handleSendAssets = () => {
    if (!selectedAssetIds.length) return toast.error('No assets selected!');
    toast.success(`Sent ${selectedAssetIds.length} asset(s)!`);
  };

  // const filteredAssets = assets.filter(
  //   (asset) =>
  //     asset.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //     (tags.length === 0 || tags.some((tag) => asset.tags?.includes(tag)))
  // );

  useEffect(() => {
    if (showGallery) loadCreatorAssets();
  }, [showGallery]); //eslint-disable-line

  return (
    <Box width="320px" display="flex" flexDirection="column" paddingTop={3} px={2}>
      <Button
        variant="contained"
        fullWidth
        sx={{ borderRadius: 999, textTransform: 'none', px: 2, mb: 2 }}
        startIcon={<AddPhotoAlternateIcon />}
        onClick={() => setShowGallery((prev) => !prev)}
      >
        {showGallery ? 'Hide Gallery' : 'Send exclusive'}
      </Button>

      {showGallery ? (
        <>
          <TextField
            fullWidth
            placeholder="Search assets..."
            size="small"
            sx={{ mb: 1 }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Stack direction="row" spacing={1} mb={2}>
            {['NSFW', 'Free', 'Paid'].map((tag, idx) => (
              <Chip
                key={idx}
                label={tag}
                color={tags.includes(tag) ? 'primary' : 'default'}
                onClick={() => setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))}
              />
            ))}
          </Stack>
          <Stack direction="row" spacing={1} mb={2}>
            {checkBox && (
              <Button
                variant="outlined"
                color={!selectedAssetIds.length ? 'success' : 'primary'}
                onClick={() => handleSelectTenAssets(!selectedAssetIds.length)}
              >
                <DoneAllIcon sx={{ mr: 1 }} /> Select 10
              </Button>
            )}
            <Button variant="outlined" onClick={handleToggleSelect}>
              {checkBox ? <CancelPresentationOutlinedIcon sx={{ mr: 1 }} /> : <GradingOutlinedIcon sx={{ mr: 1 }} />}
              {checkBox ? 'Cancel' : 'Select'}
            </Button>
            <Button variant="outlined" color="success" disabled={!selectedAssetIds.length} onClick={handleSendAssets}>
              <SendIcon sx={{ mr: 1 }} /> Send
            </Button>
          </Stack>
          <Box sx={{ flex: 1, maxHeight: 'calc(100vh - 320px)', overflowY: 'auto', pr: 1 }}>
            <AssetFeed
              assets={assets}
              checkbox={checkBox}
              selectedAssetIds={selectedAssetIds}
              setSelectedAssetIds={setSelectedAssetIds}
            />
          </Box>
        </>
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="center" px={1} py={1}>
            <Typography fontWeight="bold">Insights</Typography>
            <IconButton size="small">
              <FilterListIcon fontSize="small" />
            </IconButton>
          </Box>
          <Divider sx={{ my: 2, borderColor: 'black' }} />

          <Stack spacing={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <MonetizationOnIcon color="success" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Income
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  $1,250
                </Typography>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <CollectionsIcon color="primary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Assets
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  58 Items
                </Typography>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <VisibilityIcon color="info" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Most Viewed
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  Image #204
                </Typography>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <PaidIcon color="warning" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Top Paid Asset
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  &quot;VIP\ Pic 1&quot; - $300
                </Typography>
              </Box>
            </Box>
          </Stack>

          <Divider sx={{ my: 3, borderColor: 'black' }} />
        </>
      )}
    </Box>
  );
}
