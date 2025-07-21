import { Avatar, Box, Button, Card, Stack, Typography } from '@mui/material';

export function AccountAnalytics() {
  return (
    <Box pb={5}>
      <Stack spacing={2}>
        <Typography variant="h6">Engagement Tools</Typography>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} flexWrap="wrap">
          <Button variant="outlined" color="info">
            Story Highlights
          </Button>
          <Button variant="contained" color="success">
            Promote Content
          </Button>
          <Button variant="outlined" color="warning">
            Collab Invite
          </Button>
        </Stack>

        <Card sx={{ p: 2 }}>
          <Typography variant="h6">🔴 Live Now</Typography>
          <Typography variant="body2">You’re currently broadcasting to 213 viewers.</Typography>
          <Button variant="outlined" size="small" sx={{ mt: 1 }}>
            Join Stream
          </Button>
        </Card>
      </Stack>
      <Stack spacing={2}>
        {/* =========>>>>>>>>MONETIZATION<<<<<<<<<<<============= */}

        <Typography variant="h6">Monetization</Typography>

        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Button variant="contained" color="secondary">
            💎 Tip Jar
          </Button>
          <Button variant="outlined" color="success">
            🎁 Exclusive Drop
          </Button>
        </Stack>

        <Card variant="outlined" sx={{ p: 2, mt: 1 }}>
          <Typography variant="subtitle1">Earnings Summary (Demo)</Typography>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">This Month</Typography>
            <Typography variant="body2">₹2,450</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">Tips</Typography>
            <Typography variant="body2">₹900</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">Subscriptions</Typography>
            <Typography variant="body2">₹1,550</Typography>
          </Stack>
        </Card>
      </Stack>
      {/* =========>>>>>>>>ANALYTICS<<<<<<<<<<<============= */}
      <Stack spacing={2}>
        <Typography variant="h6">Analytics</Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} flexWrap="wrap">
          <Card sx={{ p: 2, minWidth: 120 }}>
            <Typography variant="h6">1.2K</Typography>
            <Typography variant="caption">Views</Typography>
          </Card>
          <Card sx={{ p: 2, minWidth: 120 }}>
            <Typography variant="h6">310</Typography>
            <Typography variant="caption">Saves</Typography>
          </Card>
          <Card sx={{ p: 2, minWidth: 120 }}>
            <Typography variant="h6">72</Typography>
            <Typography variant="caption">Clicks</Typography>
          </Card>
        </Stack>
        {/* =========>>>>>>>>PERFORMANCES<<<<<<<<<<<============= */}

        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2">📈 30-Day Performance</Typography>
          <Box
            sx={{
              height: 100,
              borderRadius: 1,
              mt: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography variant="caption" color="text.secondary">
              [ Graph Placeholder ]
            </Typography>
          </Box>
        </Card>
      </Stack>
      {/* =========>>>>>>>>POLLS<<<<<<<<<<<============= */}

      <Card variant="outlined" sx={{ p: 2, mt: 2 }}>
        <Typography variant="subtitle1">📊 Poll of the Week</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          What should I post next?
        </Typography>
        <Stack spacing={1} mt={1}>
          <Button variant="outlined" size="small">
            A. BTS Video
          </Button>
          <Button variant="outlined" size="small">
            B. Exclusive Photos
          </Button>
          <Button variant="outlined" size="small">
            C. AMA Livestream
          </Button>
        </Stack>
      </Card>
      {/* =========>>>>>>>>TOP FANS<<<<<<<<<<<============= */}

      <Stack spacing={1}>
        <Typography variant="h6">Top Fans</Typography>
        <Stack direction="row" spacing={1}>
          {[1, 2, 3].map((i) => (
            <Avatar key={i} src={`/avatars/fan${i}.jpg`} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
