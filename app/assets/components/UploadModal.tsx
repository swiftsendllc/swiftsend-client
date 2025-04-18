import { InputElement } from '@/components/InputElement';
import useAssetAPI from '@/hooks/api/useAssetAPI';
import { CreatorAssetsEntity } from '@/hooks/entities/assets.entity';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  LinearProgress,
  Stack,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Image from 'next/image';
import { cluster } from 'radash';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export function UploadModal({
  isOpen,
  onClose,
  onUpload
}: {
  isOpen: boolean;
  onClose?: () => unknown;
  onUpload: (assets: CreatorAssetsEntity) => unknown;
}) {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const theme = useTheme();
  const [objectUrls, setObjectUrls] = useState<string[]>([]);
  const objectGroups = cluster(objectUrls, 3);
  const { uploadAndCreateAsset } = useAssetAPI();
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [files, setFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<boolean[]>([]);

  const handleUpload = async (file: File) => {
    console.log(file);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const assets = await uploadAndCreateAsset(formData);
      onUpload(assets);
    } catch (error) {
      console.error(error);
      toast.error('FAILED TO UPLOAD ASSETS!');
      return null;
    }
  };

  const handleMultipleUploads = async (_files: File[]) => {
    setLoading(true);
    setUploadStatus(Array(_files.length).fill(false));

    const uploadPromises = _files.map(async (file, index) => {
      try {
        await handleUpload(file);
        setUploadStatus((prev) => prev.map((status, idx) => (idx === index ? true : status)));
      } catch {
        toast.error(`Upload failed, try again or close: ${file.name}`);
      }
    });

    await Promise.all(uploadPromises);
    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        PaperProps={{
          style: {
            margin: 0,
            width: '100%'
          }
        }}
        fullWidth
        aria-describedby="asset-upload-modal"
      >
        <FormControl variant="standard" fullWidth component="form" sx={{ margin: 0, padding: 0 }}>
          <DialogTitle sx={{ pb: 0 }}>Insert asset</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Add new asset in your personal and confidential folder (Max 10)
            </DialogContentText>
            <Box textAlign="center" mb={2}>
              {files.length < 10 ? (
                <Button variant="contained" onClick={() => inputRef.current?.click()}>
                  Upload Files
                </Button>
              ) : null}

              <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent="center"
                gap={2}
                paddingTop={1}
                marginBottom={isSmallScreen ? 5 : 15}
              >
                {objectGroups.map((groups, groupIdx) =>
                  groups.map((asset, astIdx) => {
                    const index = groupIdx * 3 + astIdx;
                    return (
                      <Box
                        key={`${groupIdx}-${astIdx}`}
                        sx={{
                          position: 'relative',
                          width: {
                            xs: '25%',
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
                          src={asset}
                          alt="assets"
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                          priority
                        />
                        <Box padding={0}>
                          <LinearProgress
                            color={uploadStatus[index] ? 'success' : 'warning'}
                            variant="buffer"
                            value={uploadStatus[index] ? 100 : 10}
                            valueBuffer={uploadStatus[index] ? 100 : 20}
                          />
                        </Box>
                      </Box>
                    );
                  })
                )}
              </Stack>
            </Box>
            <InputElement inputRef={inputRef} setFiles={setFiles} setObjectUrls={setObjectUrls} />
          </DialogContent>
          <DialogActions>
            <LoadingButton
              onClick={() => handleMultipleUploads(files)}
              loading={loading}
              variant="contained"
              fullWidth
              disabled={!files.length}
            >
              Confirm
            </LoadingButton>
          </DialogActions>
        </FormControl>
      </Dialog>
    </>
  );
}
