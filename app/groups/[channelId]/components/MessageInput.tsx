"use client";

import AddIcon from "@mui/icons-material/Add";
import LandscapeIcon from "@mui/icons-material/Landscape";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, Paper, TextField } from "@mui/material";

export default function MessageInput() {
  return (
    <Box
      width="100%"
      sx={{
        position: "fixed",
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 8,
      }}
    >
      <Container maxWidth="xs" sx={{ padding: 0 }}>
        <Paper>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={`Message `}
            value={""}
            slotProps={{
              input: {
                startAdornment: (
                  <Box mr={1.5}>
                    <AddIcon />
                  </Box>
                ),
                endAdornment: (
                  <>
                    {" "}
                    <LoadingButton loadingPosition="start" startIcon={null}>
                      <SendIcon />
                    </LoadingButton>
                    <Button>
                      <LandscapeIcon />
                    </Button>
                  </>
                ),
              },
            }}
          />
        </Paper>
      </Container>
    </Box>
  );
}
