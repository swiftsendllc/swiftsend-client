import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Typography } from '@mui/material';

interface ReturnToPreviousPageProps {
  onCancel: () => unknown;
  px: number;
}

export function CancelButton({ px, onCancel }: ReturnToPreviousPageProps) {
  return (
    <Box sx={{ top: 16, right: 16, position: 'absolute', zIndex: 10 }}>
      <IconButton
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          borderRadius: 3,
          px: { px }
        }}
        onClick={onCancel}
        >
        <Typography>Cancel</Typography>
        <CloseIcon sx={{ width: 30, height: 30 }} />
      </IconButton>
    </Box>
  );
}
