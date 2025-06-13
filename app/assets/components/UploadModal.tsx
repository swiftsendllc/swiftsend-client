import { InputElement } from '@/components/InputElement';
import useAssetAPI from '@/hooks/api/useAssetAPI';
import { CreatorAssetsEntity } from '@/hooks/entities/assets.entity';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Image from 'next/image';
import { cluster } from 'radash';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface UploadModalProps {
  isOpen: boolean;
  onClose?: () => unknown;
  onUpload: (assets: CreatorAssetsEntity) => unknown;
}

export function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
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
        toast.error(`FAILED TO UPLOAD: ${file.name}`);
      }
    });

    await Promise.all(uploadPromises);
    setLoading(false);
    toast.success('ASSETS UPLOADED');
    handleClose();
  };

  const handleFiles = (_files: FileList | File[]) => {
    if (!_files) return;
    const multipleFiles = Array.from(_files).slice(0, 10);
    const selectedFiles = [...files, ...multipleFiles];
    setFiles(selectedFiles);
    setObjectUrls((prev) => [...prev, ...selectedFiles.map((file) => URL.createObjectURL(file))]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleClose = () => {
    setOpen(false);
    onClose?.();
    setFiles([]);
    setObjectUrls([]);
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
        <FormControl variant="standard" fullWidth component="form" sx={{ margin: 0, padding: 0 }} id="form-upload">
          <DialogTitle sx={{ pb: 0 }}>Insert asset</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Add new asset in your personal and confidential folder (Max 10)
            </DialogContentText>
            <Box textAlign="center" mb={2}>
              <Box onDrop={handleDrop} onDragOver={handleDragOver}>
                {files.length < 10 ? (
                  <Paper
                    elevation={3}
                    sx={{
                      border: '2px dashed #ccc',
                      borderRadius: 2,
                      p: 4,
                      cursor: 'pointer',
                      backgroundColor: '#cfebf1'
                    }}
                    onClick={() => inputRef.current?.click()}
                  >
                    <CloudUploadIcon sx={{ fontSize: 50, color: '#888' }} />
                    <Typography variant="body1" mt={1} color="primary">
                      Drag & drop files here or click to upload
                    </Typography>
                    <Typography variant="caption" color="primary">
                      (Up to 10 files)
                    </Typography>
                  </Paper>
                ) : null}
              </Box>
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
                        <IconButton
                          sx={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            color: 'inherit',
                            position:"relative"
                          }}
                        >
                          <DeleteIcon sx={{ width: 40, height: 40 }}

                          />
                        </IconButton>
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
