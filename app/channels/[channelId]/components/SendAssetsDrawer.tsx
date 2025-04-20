import { AssetFeed } from '@/app/assets/components/AssetFeed';
import { widths } from '@/components/SearchComponents';
import useAssetAPI from '@/hooks/api/useAssetAPI';
import { CreatorAssetsEntity } from '@/hooks/entities/assets.entity';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import { Box, Button, Container, Drawer, Fab, Paper, Slider, Stack, Typography } from '@mui/material';
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

  const handleSelectTenAssets = (hasSelected: boolean) => {
    const selectedAssets = assets.slice(0, 10);
    if (hasSelected) {
      setSelectedAssetIds(selectedAssets.map((asst) => asst.assetId));
    } else {
      setSelectedAssetIds([]);
    }
    return selectedAssets;
  };

  const handleToggleSelect = () => {
    setSelectedAssetIds([]);
    setCheckBox((prev) => !prev);
  };

  return (
    <>
      <Container maxWidth="xs">
        <Drawer
          anchor="left"
          open={open}
          onClose={handleClose}
          sx={{
            '& .MuiDrawer-paper': { width: 310, height: '100vh', }
          }}
          hideBackdrop
        >
          <Box sx={{ position: 'fixed', zIndex: 100, width: 310 , p:0}}>
            <Paper sx={{ width: '100%' }}>
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Button onClick={handleClose}>
                  <CloseIcon />
                </Button>
                <Box sx={{ width: 150 }}>
                  <Slider
                    defaultValue={25}
                    min={20}
                    marks={widths}
                    step={5}
                    onChange={(_, value) => {
                      if (typeof value === 'number') {
                        setWidth(value);
                      }
                    }}
                  />
                </Box>
              </Stack>

                <Stack direction={'column'}>
                  <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    alignContent={'center'}
                    alignItems={'center'}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      🄰🅂🅂🄴🅃🅂
                    </Typography>
                    <Fab
                      color={!selectedAssetIds.length ? 'default' : 'primary'}
                      aria-label="filter-select"
                    >
                      {selectedAssetIds.length}
                    </Fab>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ flexWrap: 'wrap' }}
                    spacing={1}
                    mt={1}
                  >
                    {checkBox && (
                      <>
                        <Fab
                          variant="extended"
                          color={!selectedAssetIds.length ? 'default' : 'primary'}
                          aria-label="filter-select"
                          onClick={() => handleSelectTenAssets(!selectedAssetIds.length)}
                        >
                          <DoneAllIcon />
                          Select 10
                        </Fab>
                      </>
                    )}
                    <Fab variant="extended" aria-label="checkbox" onClick={handleToggleSelect}>
                      {checkBox ? <CancelPresentationOutlinedIcon /> : <GradingOutlinedIcon />}
                      {checkBox ? 'Cancel' : 'Select'}
                    </Fab>
                  </Stack>
                </Stack>
            </Paper>
          </Box>
          <Box paddingTop={20}>
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
