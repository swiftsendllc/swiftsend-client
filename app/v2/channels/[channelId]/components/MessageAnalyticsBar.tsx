import CollectionsIcon from '@mui/icons-material/Collections';
import FilterListIcon from '@mui/icons-material/FilterList';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PaidIcon from '@mui/icons-material/Paid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Divider, IconButton, Stack, Typography } from '@mui/material';

export function MessageAnalyticsBar() {
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" px={1} py={1}>
        <Typography fontWeight="bold">Insights</Typography>
        <IconButton size="small">
          <FilterListIcon fontSize="small" />
        </IconButton>
      </Box>
      <Divider sx={{ my: 2, borderColor: 'black' }} />

      <Stack spacing={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <MonetizationOnIcon color="success" />
          <Box>
            <Typography variant="body2" color="text.secondary">
              Total Income
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              $1,250
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <CollectionsIcon color="primary" />
          <Box>
            <Typography variant="body2" color="text.secondary">
              Total Assets
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              58 Items
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <VisibilityIcon color="info" />
          <Box>
            <Typography variant="body2" color="text.secondary">
              Most Viewed
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              Image #204
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <PaidIcon color="warning" />
          <Box>
            <Typography variant="body2" color="text.secondary">
              Top Paid Asset
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              &quot;VIP\ Pic 1&quot; - $300
            </Typography>
          </Box>
        </Box>
      </Stack>

      <Divider sx={{ my: 3, borderColor: 'black' }} />
    </>
  );
}
