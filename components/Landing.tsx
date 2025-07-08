'use client';
import { useTranslation } from '@/locales/dictionary';
import { Box, Button, Container, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GoogleIconCustom } from './CustomIcons';
import { GenerateWallpaper } from './GenerateWallpaper';
import { LocaleMenu } from './LocaleMenu';
import { customBoxStyle } from './SearchComponents';

export default function LandingPage() {
  const defaultUrl = `/photos/pexels-nout-gons-80280-378570.jpg`;
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t, locale, setLocale } = useTranslation();
  const [wallpaper, setWallpaper] = useState<string>(defaultUrl);
  GenerateWallpaper({ setWallpaper });

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
        animation: 'kenburns 30s ease-in-out infinite alternate'
      }}
    >
      <LocaleMenu locale={locale} setLocale={setLocale} />
      <Box sx={{ ...customBoxStyle, mt: isMobile ? 10 : 16 }}>
        <Image
          src="/icons/app_icon.png"
          alt="App Icon"
          width={100}
          height={100}
          priority
          style={{ marginBottom: '10px' }}
        />
        <Typography variant="h4" fontWeight={600}>
          {t('appName')}
        </Typography>

        <Stack spacing={2} mt={4}>
          <Button
            fullWidth
            sx={{
              py: 1.5,
              background: 'linear-gradient(to right, #4ade80, #22c55e)',
              '&:hover': {
                boxShadow: '0 0 12px #4ade80'
              }
            }}
            onClick={() => router.push('/signup')}
          >
            {t('signUp')}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              color: 'white',
              py: 1.5,
              borderColor: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
            onClick={() => router.push('/login')}
          >
            {t('login')}
          </Button>
          <Button
            startIcon={<GoogleIconCustom />}
            fullWidth
            sx={{
              py: 1.5,
              backgroundColor: '#4285F4',
              color: 'white',
              '&:hover': {
                backgroundColor: '#3367D6',
                boxShadow: '0 0 10px #4285F4'
              }
            }}
          >
            {t('googleSign')}
          </Button>
        </Stack>
        <Typography mt={3} variant="caption">
          {t('privacyPolicy')}
        </Typography>
      </Box>
    </Container>
  );
}
