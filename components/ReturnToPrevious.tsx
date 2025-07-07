import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';

interface ReturnToPreviousPageProps {
  px: number;
}

export function ReturnToPreviousPage({ px }: ReturnToPreviousPageProps) {
  const router = useRouter();
  return (
    <Box sx={{ top: 16, left: 16, position: 'absolute', zIndex: 10 }}>
      <IconButton
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(255,255, 255, 0.1)',
          color: 'white',
          borderRadius: 3,
          px: { px }
        }}
        onClick={() => router.back()}
      >
        <ArrowBackIcon sx={{ width: 30, height: 30 }} />
      </IconButton>
    </Box>
  );
}
