import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  Switch,
  TextField
} from '@mui/material';
import React from 'react';

interface ExclusivePostProps {
  text: string;
  price: number;
  isOpen: boolean;
  isExclusive: boolean;
  onClose?: () => unknown;
  handleAction: () => unknown;
  selectedAssetsMap: Map<string, string[]>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  setIsExclusive: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedAssetsMap: React.Dispatch<React.SetStateAction<Map<string, string[]>>>;
}

export function CreateExclusivePostDialog({
  text,
  price,
  isOpen,
  setText,
  onClose,
  setPrice,
  isExclusive,
  handleAction,
  setIsExclusive,
  selectedAssetsMap,
  setSelectedAssetsMap
}: ExclusivePostProps) {
  const selectedAssetUrls = Array.from(selectedAssetsMap.entries()).flatMap(([assetId, urls]) =>
    urls.map((url) => ({ assetId, url }))
  );

  const handleRemoveFromSelectedAssets = (assetId: string, url: string) => {
    setSelectedAssetsMap((prev) => {
      const newMap = new Map(prev);
      const currentUrls = newMap.get(assetId)?.filter((u) => u !== url);
      if (!currentUrls?.length) newMap.delete(assetId);
      else newMap.set(assetId, currentUrls);
      return newMap;
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { borderRadius: 3, p: 2 }
      }}
    >
      <DialogTitle>Create Exclusive Post</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={3} mt={1}>
          <FormControlLabel
            control={<Switch checked={isExclusive} onChange={(e) => setIsExclusive(e.target.checked)} />}
            label={isExclusive ? 'Exclusive Post' : "Non-exclusive post can\'t be send"}
          />

          {isExclusive && (
            <TextField
              id="price"
              name="price"
              label="Price"
              type="text"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value.replace(/[^0-9]/g, '')))}
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  )
                }
              }}
            />
          )}

          <TextField
            id="message"
            name="message"
            label="Write your message..."
            multiline
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small">
                      <InsertEmoticonIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
          />

          <Box>
            <Stack direction="row" spacing={1} mt={1} overflow="auto">
              {selectedAssetUrls.map(({ assetId, url }, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    position: 'relative',
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 2
                  }}
                >
                  <Box
                    component={'img'}
                    src={url}
                    alt={`sent`}
                    sx={{
                      width: 80,
                      height: 80,
                      objectFit: 'cover',
                      borderRadius: 2
                    }}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 2,
                      right: 2,
                      background: 'rgba(0,0,0,0.4)',
                      color: 'white',
                      p: '2px'
                    }}
                    size="small"
                    onClick={() => handleRemoveFromSelectedAssets(assetId, url)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          color="primary"
          onClick={() => {
            handleAction();
            onClose?.();
          }}
          disabled={!isExclusive || price === 0}
        >
          Send Post
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
