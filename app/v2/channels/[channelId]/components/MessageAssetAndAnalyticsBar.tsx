'use client';

import useAssetAPI from '@/hooks/api/useAssetAPI';
import { CreatorAssetsEntity } from '@/hooks/entities/assets.entity';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import BurstModeIcon from '@mui/icons-material/BurstMode';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CreateExclusivePostDialog } from './CreateExclusivePostDialog';
import { MessageAnalyticsBar } from './MessageAnalyticsBar';
import { MessageAssetBar } from './MessageAssetBar';

interface MessageInputProps {
  onMessage: (msg: MessagesEntity) => unknown;
}

export function MessageAssetAndAnalyticsBar({ onMessage }: MessageInputProps) {
  const { getCreatorAssets } = useAssetAPI();
  const [assets, setAssets] = useState<CreatorAssetsEntity[]>([]);
  const [checkBox, setCheckBox] = useState<boolean>(false);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [openExcDialog, setOpenExcDialog] = useState<boolean>(false);
  const [selectedAssetsMap, setSelectedAssetsMap] = useState<Map<string, string[]>>(new Map());
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
    const newAssetMap = new Map<string, string[]>();
    if (hasSelected) {
      for (const asset of selectedAssets) {
        const urls = asset._assets.map((asst) => asst.originalURL);
        newAssetMap.set(asset.assetId, urls);
      }
      setSelectedAssetsMap(newAssetMap);
    } else setSelectedAssetsMap(new Map());
  };

  const handleToggleSelect = () => {
    setOpenExcDialog(false);
    setSelectedAssetsMap(new Map());
    setCheckBox((prev) => !prev);
  };

  useEffect(() => {
    if (showGallery) loadCreatorAssets();
  }, [showGallery]); //eslint-disable-line

  return (
    <Box width="320px" display="flex" flexDirection="column" paddingTop={3} px={2} minWidth={0}>
      <Button
        variant="contained"
        fullWidth
        sx={{ borderRadius: 999, textTransform: 'none', px: 2, mb: 2 }}
        startIcon={showGallery ? <BurstModeIcon /> : <InsertPhotoIcon />}
        onClick={() => setShowGallery((prev) => !prev)}
      >
        {showGallery ? 'Hide Gallery' : 'Send exclusive'}
      </Button>

      {showGallery ? (
        <MessageAssetBar
          tags={tags}
          assets={assets}
          setTags={setTags}
          checkBox={checkBox}
          setSearchTerm={setSearchTerm}
          setOpenExcDialog={setOpenExcDialog}
          onHandleToggleSelect={handleToggleSelect}
          selectedAssetsMap={selectedAssetsMap}
          setSelectedAssetsMap={setSelectedAssetsMap}
          onHandleSelectTenAssets={(hasSelected) => handleSelectTenAssets(hasSelected)}
        />
      ) : (
        <MessageAnalyticsBar />
      )}
      <CreateExclusivePostDialog
        isOpen={openExcDialog}
        onClose={handleToggleSelect}
        onSend={(msg) => onMessage(msg)}
        selectedAssetsMap={selectedAssetsMap}
        setSelectedAssetsMap={setSelectedAssetsMap}
      />
    </Box>
  );
}
