'use client';

import InputElement from '@/components/InputElement';
import { previewGrid } from '@/components/SearchComponents';
import usePostAPI from '@/hooks/api/usePostAPI';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LoadingButton } from '@mui/lab';

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function PostPreview() {
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState<string>('');
  const [objectUrls, setObjectUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadFile } = usePostAPI();
  const { createPost } = usePostAPI();
  const [isExclusive, setIsExclusive] = useState<boolean>(true);
  const [priceError, setPriceError] = useState<string>('');
  const [price, setPrice] = useState<number>(200);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!files) return;
    setLoading(true);
    try {
      const formData = new FormData();
      files.map((file) => {
        formData.append('files', file);
      });
      const urls = await uploadFile(formData);

      const originalUrl = urls.map((url) => url.originalFile.url);
      const blurredUrl = urls.map((url) => url.blurredFile.url);

      await createPost({
        caption,
        imageUrls: originalUrl,
        blurredImageUrls: blurredUrl,
        isExclusive,
        price
      });
      setObjectUrls(originalUrl);
      router.back();
    } catch (error) {
      console.error(error);
      setPriceError('Minimum price is 200 INR');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = (objectUrls: string[], idx: number) => {
    setFiles(files.filter((_, id) => id !== idx));
    setObjectUrls(objectUrls.filter((_, id) => id !== idx));
  };

  return (
    <>
      <Container
        maxWidth="xs"
        sx={{
          alignContent: 'center',
          alignItems: 'center',
          mb: 6
        }}
      >
        <Stack mt={2}>
          <Stack direction="row" alignContent="center" alignItems="center">
            <IconButton onClick={() => router.back()} LinkComponent={Link}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography alignContent="center" alignItems="center" variant="h6">
              New Post
            </Typography>
          </Stack>
          <Divider />
        </Stack>
        <Card sx={{ padding: 0, marginTop: 5 }}>
          <Stack
            direction={'row'}
            spacing={1}
            flexWrap={'nowrap'}
            sx={{
              maxWidth: '100%',
              maxHeight: 150,
              overflowX: 'auto',
              overflowY: 'hidden',
              whiteSpace: 'nowrap'
            }}
          >
            {objectUrls.map((url, idx) => (
              <Box key={idx} position={'relative'}>
                <Image
                  src={url}
                  width={100}
                  height={100}
                  alt={'original'}
                  onClick={() => handleDeleteImage(objectUrls, idx)}
                />
              </Box>
            ))}
          </Stack>
          <Button
            startIcon={<CloudUploadIcon />}
            onClick={() => inputRef.current?.click()}
          >
            Upload
          </Button>
          <InputElement
            inputRef={inputRef}
            setFiles={setFiles}
            setObjectUrls={setObjectUrls}
          />
          <CardContent>
            <TextField
              fullWidth
              id="standard-multiline-flexible"
              variant="standard"
              multiline
              maxRows={4}
              label="Write a caption or a poll"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              focused
              autoFocus
            />
          </CardContent>
        </Card>
        <List sx={{ width: '100%', padding: 0, mb: 1 }}>
          <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignContent={'center'}
            alignItems={'center'}
          >
            <FormControlLabel
              sx={{ display: 'block' }}
              control={
                <Switch
                  checked={isExclusive}
                  onChange={() => setIsExclusive(!isExclusive)}
                  name="exclusive-switch-button"
                  color="primary"
                />
              }
              label={isExclusive ? 'Exclusive' : 'Not exclusive'}
            />
            {isExclusive && (
              <TextField
                id="outlined-number"
                type="text"
                placeholder="Enter your price"
                sx={{ mt: 1.5 }}
                helperText={priceError}
                error={!!priceError}
                value={price}
                onChange={(e) =>
                  setPrice(Number(e.target.value.replace(/[^0-9]/g, '')))
                }
              />
            )}
          </Box>

          {previewGrid.map((option, idx) => (
            <div key={idx}>
              <ListItemButton
                sx={{
                  padding: 0,
                  py: 1,
                  borderRadius: 2
                }}
              >
                <ListItemIcon sx={{ minWidth: 35, pr: 1 }}>
                  {option.leftIcon}
                </ListItemIcon>
                {option.leftIcon ? (
                  <ListItemText disableTypography>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignContent="center"
                      alignItems="center"
                    >
                      <Typography variant="h6" fontWeight={100}>
                        {option.label}
                      </Typography>
                      <Typography variant="body2">
                        {option.rightIcon}
                      </Typography>
                    </Stack>
                  </ListItemText>
                ) : (
                  <ListItemText primary={option.label} />
                )}
              </ListItemButton>

              <Divider />
            </div>
          ))}
        </List>
        <Divider />
        <Stack
          direction="row"
          spacing={1}
          sx={{
            mb: 1,
            justifyContent: 'center',
            alignContent: 'center',
            padding: 0
          }}
        >
          <Button
            variant="contained"
            fullWidth
            style={{ color: 'var(--warning)' }}
          >
            Discard
          </Button>
          <LoadingButton
            fullWidth
            loading={loading}
            variant="contained"
            type="submit"
            disabled={!(caption && objectUrls)}
            onClick={handleSubmit}
          >
            Share
          </LoadingButton>
        </Stack>
      </Container>
    </>
  );
}
