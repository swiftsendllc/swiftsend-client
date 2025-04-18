import CloseIcon from '@mui/icons-material/Close';
import Groups3Icon from '@mui/icons-material/Groups3';
import { Box, Button, Card, Container, Drawer, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export function ForwardDrawer({ isOpen, onClose }: { isOpen: boolean; onClose?: () => unknown }) {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };
  return (
    <>
      <Container maxWidth="xs">
        <Drawer
          anchor="left"
          open={open}
          onClose={handleClose}
          sx={{
            width: 320,
            height: '100vh',
            '& .MuiDrawer-paper': { width: 320, height: '100vh', p: 2 }
          }}
          hideBackdrop
        >
          <Box sx={{ left: 0, padding: 0 }}>
            <Button onClick={handleClose}>
              <CloseIcon />
            </Button>
          </Box>

          <Box
            sx={{
              pb: 2,
              borderBottom: '1px solid #ddd',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              ml: 2
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              🆂🆆🅸🅵🆃🅴🆁🆂
            </Typography>
            <Stack direction="column-reverse">
              <Typography variant="body2" fontWeight="bold" display="flex"></Typography>
              <Groups3Icon />
            </Stack>
          </Box>
          <Box sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 60px)', mt: 2 }}>
            <Card
              sx={{
                mb: 1,
                p: 1,
                boxShadow: 2,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center'
              }}
            >
            </Card>
          </Box>
        </Drawer>
      </Container>
    </>
  );
}
