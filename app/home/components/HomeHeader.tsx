'use client';

import { CreateExclusivePostDialog } from '@/app/channels/[channelId]/components/CreateExclusivePostDialog';
import usePostAPI from '@/hooks/api/usePostAPI';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Chip, Divider, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function HomeHeader() {
  const { createPost } = usePostAPI();
  const [text, setText] = useState<string>('');
  const [price, setPrice] = useState<number>(500);
  const [isExclusive, setIsExclusive] = useState<boolean>(false);
  const [openExcDialog, setOpenExcDialog] = useState<boolean>(false);
  const [selectedAssetsMap, setSelectedAssetsMap] = useState<Map<string, string[]>>(new Map());
  const selectedAssetIds = Array.from(selectedAssetsMap.keys());

  const handleCreatePost = async () => {
    try {
      await createPost({ assetIds: selectedAssetIds, caption: text, isExclusive: isExclusive, price: price });
      toast.error('UPLOADED NEW POST');
    } catch (error) {
      console.error(error);
      toast.error('Oops! Something wrong happened!');
    }
  };

  const handleClose = () => {
    setText('');
    setOpenExcDialog(false);
    setSelectedAssetsMap(new Map());
  };

  return (
    <Box display={'flex'} flexDirection={'column'} borderRight={'1px solid'} flex={1} flexGrow={'inherit'}>
      <Box display="flex" flexDirection={'row'} justifyContent="space-between" alignItems="center" px={2} py={1}>
        <Typography fontWeight="bold">POSTS</Typography>
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
      <CreateExclusivePostDialog
        text={text}
        price={price}
        setText={setText}
        setPrice={setPrice}
        onClose={handleClose}
        isOpen={openExcDialog}
        isExclusive={isExclusive}
        handleAction={handleCreatePost}
        setIsExclusive={setIsExclusive}
        selectedAssetsMap={selectedAssetsMap}
        setSelectedAssetsMap={setSelectedAssetsMap}
      />
    </Box>
  );
}
