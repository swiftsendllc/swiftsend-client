import { Box, Button, Card, CardActions, CardContent, FormControl, Stack, Typography } from '@mui/material';

export function Subscriptions() {
  return (
    <>
      <Stack direction={'row'}>
        <FormControl>
          <Box textAlign="center" mt={0}>
            <Typography variant="h4">
              Choose a Collaboration Plan
            </Typography>
            <Card sx={{ maxWidth: 300, mx: 'auto', p: 2, borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">Starter</Typography>
                <Typography variant="h4" color="primary">
                  $12
                </Typography>
                <Typography variant="body2">per month</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" fullWidth>
                  SUBSCRIBE
                </Button>
              </CardActions>
            </Card>
          </Box>
        </FormControl>
        {/* <FormControl>
          <Box textAlign="center" mt={4}>
            <Typography variant="h4" gutterBottom>
              Choose a Collaboration Plan
            </Typography>
            <Card sx={{ maxWidth: 300, mx: 'auto', p: 2, borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">Starter</Typography>
                <Typography variant="h4" color="primary">
                  $12
                </Typography>
                <Typography variant="body2">per month</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" fullWidth>
                  SUBSCRIBE
                </Button>
              </CardActions>
            </Card>
          </Box>
        </FormControl>
        <FormControl>
          <Box textAlign="center" mt={4}>
            <Typography variant="h4" gutterBottom>
              Choose a Collaboration Plan
            </Typography>
            <Card sx={{ maxWidth: 300, mx: 'auto', p: 2, borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">Starter</Typography>
                <Typography variant="h4" color="primary">
                  $12
                </Typography>
                <Typography variant="body2">per month</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" fullWidth>
                  SUBSCRIBE
                </Button>
              </CardActions>
            </Card>
          </Box>
        </FormControl> */}
      </Stack>
    </>
  );
}
