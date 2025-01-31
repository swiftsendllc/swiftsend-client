"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";

export const EncryptionNoticePage = () => {
  return (
    <>
      <Box paddingTop={3} >
        <Card sx={{ my: 2, borderRadius: "50px", marginTop: 10 }}>
          <CardContent>
            <Typography
              textAlign="center"
              alignContent="center"
              alignItems="center"
              variant="body1"
              fontWeight={200}
            >
              Messages are end to end encrypted.
              <br />
              No one outside of this chat can read or listen to them.Tap to
              learn more.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
