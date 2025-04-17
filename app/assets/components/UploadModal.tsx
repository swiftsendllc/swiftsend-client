import usePostAPI from '@/hooks/api/usePostAPI';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export function UploadModal({ isOpen, onClose }: { isOpen: boolean; onClose?: () => unknown }) {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const { uploadAndCreateAsset } = usePostAPI();
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async (file: File) => {
    console.log(file);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { originalFile, blurredFile } = await uploadAndCreateAsset(formData);

      return { originalFile, blurredFile };
    } catch (error) {
      console.error(error);
      toast.error('FAILED TO UPLOAD ASSETS!');
      return null;
    } finally {
    }
  };

  const handleMultipleUploads = async (files: File[]) => {
    setLoading(true);
    try {
      await Promise.all(files.map((file) => handleUpload(file)));
    } catch (error) {
      console.error(error);
      toast.error('Some uploads failed!');
    } finally {
      setLoading(false);
    }
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
        <FormControl variant="standard" fullWidth component={'form'} sx={{ margin: 0, padding: 0 }}>
          <DialogTitle sx={{ pb: 0 }}>Insert asset</DialogTitle>
          <DialogContent>
            <DialogContentText>Add new asset in your personal and confidential folder</DialogContentText>
            <Button onClick={() => inputRef.current?.click()}>Upload</Button>
            <input
              type="file"
              accept="image/*, video/*"
              hidden
              multiple
              ref={inputRef}
              onChange={(event) => {
                const input = event.target.files as unknown as File[];
                if (!input?.length) return;
                handleMultipleUploads(Array.from(input));
              }}
            />
          </DialogContent>
          <DialogActions>
            <LoadingButton loading={loading} variant="contained" fullWidth>
              Confirm
            </LoadingButton>
          </DialogActions>
        </FormControl>
      </Dialog>
    </>
  );
}
