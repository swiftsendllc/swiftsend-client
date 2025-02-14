"use client";

import { GroupMessagesEntity } from "@/hooks/entities/messages.entities";
import {
  DeleteForeverOutlined,
  EditLocationAlt,
  Forward10Outlined,
  ReportOffRounded,
} from "@mui/icons-material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Dialog,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function MessageInfoModal({
  isOpen,
  onClose,
}: // message,
{
  message: GroupMessagesEntity;
  isOpen: boolean;
  onClose?: () => unknown;
}) {
  const [open, setOpen] = useState<boolean>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const options = [
    {
      label: "Delete",
      leftIcon: <DeleteForeverOutlined />,
      rightIcon: <KeyboardArrowRightIcon />,
      action: () => undefined,
    },
    {
      label: "Edit",
      leftIcon: <EditLocationAlt />,
      rightIcon: <KeyboardArrowRightIcon />,
      action: () => undefined,
    },
    {
      label: "Report",
      leftIcon: <ReportOffRounded />,
      rightIcon: <KeyboardArrowRightIcon />,
      action: () => undefined,
    },
    {
      label: "Forward",
      leftIcon: <Forward10Outlined />,
      rightIcon: <KeyboardArrowRightIcon />,
      action: () => undefined,
    },
  ];

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        keepMounted
        maxWidth="xs"
        PaperProps={{
          style: {
            margin: 0,
            width: "100%",
          },
        }}
      >
        <List sx={{ width: "100%", padding: 0 }}>
          {options.map((option, idx) => (
            <>
              <Paper elevation={3}>
                <ListItemButton
                  key={idx}
                  sx={{ p: 0, py: 1, borderRadius: 2, mb: 0.5 }}
                >
                  <ListItemIcon sx={{ pr: 1 }}>{option.leftIcon}</ListItemIcon>
                  <ListItemText disableTypography>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignContent="center"
                      alignItems="center"
                    >
                      <Typography variant="body1">{option.label}</Typography>
                      <Icon>{option.rightIcon}</Icon>
                    </Stack>
                  </ListItemText>
                </ListItemButton>
              </Paper>
            </>
          ))}
        </List>
      </Dialog>
    </>
  );
}
