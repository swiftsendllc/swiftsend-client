'use client';

import { previewGrid } from '@/components/SearchComponents';
import usePostAPI from '@/hooks/api/usePostAPI';
import { UserContext } from '@/hooks/context/user-context';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { SendAssetsBox } from './SendAssetBox';

export default function PostPreview() {
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState<string>('');
  const { createPost } = usePostAPI();
  const [, setUser] = useContext(UserContext);
  const [isExclusive, setIsExclusive] = useState<boolean>(true);
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(200);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createPost({
        caption: caption,
        isExclusive: isExclusive,
        price: price,
        assetIds: selectedAssetIds
      });
      setUser((prev) => ({ ...prev, postCount: prev.postCount + 1 }));
      router.back();
    } catch (error) {
      console.error(error);
      toast.error('FAILED TO CREATE POST!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'space-evenly'
        }}
      >
        <Box sx={{pr:10}}>
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
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value.replace(/[^0-9]/g, '')))}
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
                  <ListItemIcon sx={{ pr: 1 }}>{option.leftIcon}</ListItemIcon>
                  {option.leftIcon ? (
                    <ListItemText disableTypography>
                      <Stack direction="row" justifyContent="space-between" alignContent="center" alignItems="center">
                        <Typography variant="h6" fontWeight={100}>
                          {option.label}
                        </Typography>
                        <Typography variant="body2">{option.rightIcon}</Typography>
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
            <Button variant="contained" fullWidth style={{ color: 'var(--warning)' }}>
              Discard
            </Button>
            <LoadingButton
              fullWidth
              loading={loading}
              variant="contained"
              type="submit"
              disabled={!caption}
              onClick={handleSubmit}
            >
              Share
            </LoadingButton>
          </Stack>
        </Box>
        <Box>
          <SendAssetsBox selectedAssetIds={selectedAssetIds} setSelectedAssetIds={setSelectedAssetIds} />
        </Box>
      </Container>
    </>
  );
}
