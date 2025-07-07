import { InputElement } from '@/components/InputElement';
import useAssetAPI from '@/hooks/api/useAssetAPI';
import { CreatorAssetsEntity } from '@/hooks/entities/assets.entity';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  LinearProgress,
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

export function UploadAssetModal({ isOpen, onClose, onUpload }: UploadModalProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const [objectUrls, setObjectUrls] = useState<string[]>([]);
  const objectGroups = cluster(objectUrls, 3);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { uploadAndCreateAsset } = useAssetAPI();
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
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
        maxWidth="sm"
        fullWidth
        aria-describedby="asset-upload-modal"
        PaperProps={{
          sx: {
            m: 0,
            borderRadius: 3,
            backdropFilter: 'blur(6px)',
            boxShadow: 10,
            overflow: 'hidden'
          }
        }}
      >
        <FormControl variant="standard" fullWidth component="form" id="form-upload" sx={{ padding: 0, m: 0 }}>
          <DialogTitle
            sx={{
              fontWeight: 700,
              fontSize: '1.4rem',
              px: 3,
              py: 2
            }}
          >
            Upload Assets
          </DialogTitle>

          <DialogContent
            dividers
            sx={{
              px: 3,
              py: 2,
              maxHeight: '60vh',
              overflowY: 'auto'
            }}
          >
            <DialogContentText sx={{ mb: 2, fontSize: '0.95rem' }}>
              Upload your confidential assets (up to <b>10 files</b>). Images will be shown below with progress
              indicators.
            </DialogContentText>
            <Box
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => inputRef.current?.click()}
              sx={{
                p: 4,
                border: '2px dashed #90caf9',
                borderRadius: 3,
                textAlign: 'center',
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                  backgroundColor: '#bbdefb'
                }
              }}
            >
              <CloudUploadIcon sx={{ fontSize: 50, color: '#42a5f5' }} />
              <Typography variant="h6" mt={1}>
                Drag & drop or click to upload
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {files.length}/10 files selected
              </Typography>
            </Box>
            <Box>
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
                      <Box key={`${groupIdx}-${astIdx}`}>
                        <Box
                          key={`${groupIdx}-${astIdx}`}
                          sx={{
                            position: 'relative',
                            width: '100px',
                            aspectRatio: '4 / 3',
                            borderRadius: 2,
                            height: '100px',
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
                          <Image src={asset} alt="assets" fill style={{ objectFit: 'cover' }} priority />

                          <Box
                            sx={{
                              position: 'absolute',
                              top: 5,
                              right: 5,
                              borderRadius: '50%',
                              p: 0.5,
                              zIndex: 5
                            }}
                          >
                            <IconButton size="small">
                              <DeleteIcon fontSize="small" color="error" />
                            </IconButton>
                          </Box>
                          <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
                            <LinearProgress
                              variant="buffer"
                              value={uploadStatus[index] ? 100 : 15}
                              valueBuffer={uploadStatus[index] ? 100 : 40}
                              color={uploadStatus[index] ? 'success' : 'warning'}
                            />
                          </Box>
                        </Box>
                      </Box>
                    );
                  })
                )}
              </Stack>
              <InputElement inputRef={inputRef} setFiles={setFiles} setObjectUrls={setObjectUrls} />
            </Box>
          </DialogContent>
          <Box
            sx={{
              px: 3,
              py: 2,
              position: 'sticky',
              bottom: 0,
              zIndex: 1
            }}
          >
            <Typography variant="caption" color="text.secondary" mb={1} display="block">
              {files.length > 0
                ? `${files.length} file${files.length > 1 ? 's' : ''} ready to upload.`
                : `No files selected.`}
            </Typography>
            <LoadingButton
              onClick={() => handleMultipleUploads(files)}
              loading={loading}
              variant="contained"
              fullWidth
              disabled={!files.length}
              sx={{
                fontWeight: 600,
                py: 1.5,
                bgcolor: '#1976d2',
                '&:hover': { bgcolor: '#1565c0' }
              }}
            >
              Upload Now
            </LoadingButton>
          </Box>
        </FormControl>
      </Dialog>
    </>
  );
}
