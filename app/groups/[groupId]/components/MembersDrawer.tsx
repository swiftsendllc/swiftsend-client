"use client";
import { GroupsEntity } from "@/hooks/entities/messages.entities";
import CloseIcon from "@mui/icons-material/Close";
import Groups3Icon from "@mui/icons-material/Groups3";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function MembersDrawerPage({
  isOpen,
  onClose,
  group,
}: {
  isOpen: boolean;
  onClose?: () => unknown;
  group: GroupsEntity;
}) {
  const [open, setOpen] = useState<boolean>(false);
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
            height: "100vh",
            "& .MuiDrawer-paper": { width: 320, height: "100vh", p: 2 },
          }}
        >
          <Box sx={{ left: 0, padding: 0 }}>
            <Button onClick={handleClose}>
              <CloseIcon />
            </Button>
          </Box>

          <Box
            sx={{
              pb: 2,
              borderBottom: "1px solid #ddd",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-between",
              ml: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Swifters
            </Typography>
            <Stack direction="column-reverse">
              <Typography variant="body2" fontWeight="bold" display="flex">
                {group.members.length}
              </Typography>
              <Groups3Icon />
            </Stack>
          </Box>
          <Box
            sx={{ overflowY: "auto", maxHeight: "calc(100vh - 60px)", mt: 2 }}
          >
            {group.members.map((member, idx) => (
              <Card
                key={idx}
                sx={{
                  mb: 1,
                  p: 1,
                  boxShadow: 2,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar src={member.avatarURL} alt={member.fullName} />
                  }
                  title={member.fullName}
                  subheader={member.username}
                  action={
                    <Button variant="contained" size="small">
                      A
                    </Button>
                  }
                  sx={{ flex: 1 }}
                />
              </Card>
            ))}
          </Box>
        </Drawer>
      </Container>
    </>
  );
}
