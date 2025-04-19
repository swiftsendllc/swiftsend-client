import { AssetFeed } from '@/app/assets/components/AssetFeed';
import { widths } from '@/components/SearchComponents';
import useAssetAPI from '@/hooks/api/useAssetAPI';
import { CreatorAssetsEntity } from '@/hooks/entities/assets.entity';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CloseIcon from '@mui/icons-material/Close';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import { Box, Button, Container, Drawer, Fab, IconButton, Paper, Slider, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function SendAssetsDrawer({ isOpen, onClose }: { isOpen: boolean; onClose?: () => unknown }) {
  const [open, setOpen] = useState<boolean>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const { getCreatorAssets } = useAssetAPI();
  const [assets, setAssets] = useState<CreatorAssetsEntity[]>([]);
  const [checkBox, setCheckBox] = useState<boolean>(false);
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [width, setWidth] = useState<number>(25);

  const loadCreatorAssets = async () => {
    try {
      const fetchedAssets = await getCreatorAssets();
      setAssets(fetchedAssets);
    } catch (error) {
      console.log(error);
      toast.error('FAILED TO LOAD ASSETS!');
    }
  };
  useEffect(() => {
    if (open) loadCreatorAssets();
  }, [open]); //eslint-disable-line

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <>
      <Container maxWidth="xs">
        <Drawer
          anchor="left"
          open={open}
          onClose={handleClose}
          sx={{
            '& .MuiDrawer-paper': { width: 315, height: '100vh', p: 2 }
          }}
          hideBackdrop
        >
          <Box sx={{ position: 'fixed', zIndex: 100, width: 320 }}>
            <Paper sx={{ width: '100%' }}>
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Button onClick={handleClose}>
                  <CloseIcon />
                </Button>
                <Slider
                  defaultValue={25}
                  min={20}
                  marks={widths}
                  step={5}
                  sx={{ width: 150 }}
                  onChange={(_, value) => {
                    if (typeof value === 'number') {
                      setWidth(value);
                    }
                  }}
                />
              </Stack>

              <Box
                sx={{
                  pb: 2,
                  borderBottom: '1px solid #ddd',
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  ml: 2
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  🆂🆆🅸🅵🆃🅴🆁🆂
                </Typography>
                <Stack direction="row">
                  <Fab color="primary" aria-label="add" size="small">
                    {selectedAssetIds.length}{' '}
                  </Fab>
                  <IconButton
                    onClick={() => {
                      setSelectedAssetIds([]);
                      setCheckBox((prev) => !prev);
                    }}
                  >
                    {checkBox ? <DisabledByDefaultOutlinedIcon /> : <CheckBoxOutlineBlankIcon />}
                  </IconButton>
                </Stack>
              </Box>
            </Paper>
          </Box>
          <Box paddingTop={12}>
            <AssetFeed
              assets={assets}
              checkbox={checkBox}
              selectedAssetIds={selectedAssetIds}
              setSelectedAssetIds={setSelectedAssetIds}
              width={width}
            />
          </Box>
        </Drawer>
      </Container>
    </>
  );
}
