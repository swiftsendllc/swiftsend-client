import { Box, Skeleton, Stack } from '@mui/material';

export default function MessageSkeletonLoader() {
  return (
    <Box maxWidth={'746px'}>
      {Array.from({ length: 10 }).map((_, idx) => {
        const isSender = idx % 2 === 0;
        return (
          <Box key={idx} display={'flex'} justifyContent={isSender ? 'flex-start' : 'flex-end'}>
            <Box
            minWidth={"70%"}
              px={2}
              py={1}
              sx={{
                borderRadius: 2,
                mb: 2,
                transition: 'all 0.3s ease-in-out',
                boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                bgcolor: "transparent"
              }}
            >
              <Stack spacing={1} maxWidth={200} >
                <Skeleton variant="text" width="80%" height={20} />
                <Skeleton variant="text" width="60%" height={20} />
              </Stack>

              <Box display="flex" justifyContent={isSender ? "flex-start" : "flex-end"} alignItems="center" mt={0.5}>
                <Skeleton variant="text" width={80} height={16} />
                <Skeleton variant="circular" width={24} height={24} />
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
