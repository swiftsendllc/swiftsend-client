import { Container, Paper, Stack, Typography } from "@mui/material";

export default function TopNav() {
  return (
    <Paper
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 50,
        right: 0,
        zIndex: 4,
      }}
      elevation={2}
    >
      <Container
        maxWidth="xs"
        style={{ padding: "0", alignContent: "center", alignItems: "center" }}
      >
        <Stack direction='row' justifyContent='space-between'>
          <Typography padding={1} fontWeight={600} variant="h5">
            Instagram
          </Typography>
        </Stack>
      </Container>
    </Paper>
  );
}
