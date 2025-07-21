import { AssetFeed } from '@/app/assets/components/AssetFeed';
import { CreatorAssetsEntity } from '@/hooks/entities/assets.entity';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, Chip, Stack, TextField } from '@mui/material';

interface MessageAssetProps {
  tags: string[];
  checkBox: boolean;
  searchTerm: string;
  assets: CreatorAssetsEntity[];
  onHandleToggleSelect: () => unknown;
  selectedAssetsMap: Map<string, string[]>;
  setSelectedAssetsMap: React.Dispatch<React.SetStateAction<Map<string, string[]>>>;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  onHandleSelectTenAssets: (hasSelected: boolean) => unknown;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setOpenExcDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MessageAssetBar({
  tags,
  assets,
  setTags,
  checkBox,
  searchTerm,
  setSearchTerm,
  selectedAssetsMap,
  setOpenExcDialog,
  setSelectedAssetsMap,
  onHandleToggleSelect,
  onHandleSelectTenAssets
}: MessageAssetProps) {
  const selectedAssetIds = Array.from(selectedAssetsMap.keys());
  return (
    <>
      <TextField
        id="asset"
        name="asset"
        fullWidth
        placeholder="Search assets..."
        size="small"
        sx={{ mb: 1 }}
        value={searchTerm}
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
            onClick={() => onHandleSelectTenAssets(!selectedAssetIds.length)}
          >
            <DoneAllIcon sx={{ mr: 1 }} /> Select 10
          </Button>
        )}
        <Button variant="outlined" onClick={onHandleToggleSelect}>
          {checkBox ? <CancelPresentationOutlinedIcon sx={{ mr: 1 }} /> : <GradingOutlinedIcon sx={{ mr: 1 }} />}
          {checkBox ? 'Cancel' : 'Select'}
        </Button>
        <Button
          variant="outlined"
          color="success"
          disabled={!selectedAssetIds.length}
          onClick={() => setOpenExcDialog(true)}
        >
          <SendIcon sx={{ mr: 1 }} /> Create
        </Button>
      </Stack>
      <Box sx={{ flex: 1, maxHeight: 'calc(100vh - 320px)', overflowY: 'auto', pr: 1 }}>
        <AssetFeed
          assets={assets}
          checkBox={checkBox}
          selectedAssetsMap={selectedAssetsMap}
          setSelectedAssetsMap={setSelectedAssetsMap}
        />
      </Box>
    </>
  );
}
