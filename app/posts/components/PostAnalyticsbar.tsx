import AddIcon from '@mui/icons-material/Add';
import InsightsIcon from '@mui/icons-material/Insights';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import toast from 'react-hot-toast';

export function PostAnalyticsBar() {
  return (
    <Box
      width={'100%'}
      sx={{
        px: 2,
        display: { xs: 'none', md: 'block' },
        backdropFilter: 'blur(6px)'
      }}
    >
      <Stack spacing={3}>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2, fontWeight: 'bold' }}
          onClick={() => toast('Open Create Post Modal')}
        >
          Create New Post
        </Button>

        <Card sx={{ borderRadius: 2, background: '#ffffff0a' }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              <InsightsIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
              Analytics
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Typography variant="body2">Total Posts:</Typography>
            <Typography variant="body2">Purchased Posts:</Typography>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 2, background: '#ffffff0a' }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              <TrendingUpIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
              Trending
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Stack spacing={1}>
              <Typography variant="body2" noWrap>
                {'Untitled'}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
