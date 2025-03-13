'use client';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Container, Modal, Stack } from '@mui/material';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function ImagePreviewModalPage({
  isOpen,
  onClose,
  onUpload,
  imageURL,
  setImageURLInput,
  setFile
}: {
  isOpen: boolean;
  onClose?: () => unknown;
  onUpload: () => unknown;
  imageURL: string;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  setImageURLInput: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const handleDelete = () => {
    setFile(undefined);
    setImageURLInput('');
  };

  return (
    <>
      <Container maxWidth="xs">
        <Modal open={open} onClose={handleClose} sx={{ margin: 5 }}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 300,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              border: '2px solid #000'
            }}
          >
            <Stack direction="row" spacing={1}>
              {imageURL && <Image width="75" height="75" src={imageURL} alt="$" />}
            </Stack>
            <Stack direction="column" alignContent="left">
              {!imageURL ? (
                <>
                  <Button startIcon={<CloudUploadIcon />} onClick={() => inputRef.current?.click()}>
                    UPLOAD
                  </Button>
                  <input
                    type="file"
                    ref={inputRef}
                    accept="image/*"
                    onChange={(e) => {
                      if (!e.target.files?.length) return;
                      const file = e.target.files[0];
                      setFile(file);
                      setImageURLInput(URL.createObjectURL(file));
                    }}
                    hidden
                  />
                </>
              ) : (
                <Button startIcon={<DeleteIcon />} onClick={handleDelete}>
                  DELETE
                </Button>
              )}
              <Stack direction="row">
                <Button onClick={onUpload}>POST</Button>
                <Button startIcon={<DeleteIcon />}>DISCARD</Button>
              </Stack>
            </Stack>
          </Box>
        </Modal>
      </Container>
    </>
  );
}
