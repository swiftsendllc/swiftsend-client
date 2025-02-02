import ChecklistIcon from "@mui/icons-material/Checklist";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import React, { Fragment, useEffect, useState } from "react";

export const InfoChannelDrawer = ({
  isOpen,
  onClose,
  setCheckBox,
  setBackground
}: {
  isOpen: boolean;
  onClose?: () => unknown;
  setCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
  setBackground: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const drawer = [
    {
      label: "Select",
      icon: <ChecklistIcon />,
      action: () => {
        setCheckBox(true);
        handleClose();
      },
    },
    {
      label: "Change Background",
      icon: <WallpaperIcon />,
      action: () => {
        setBackground(true)
      }
    },
    {
      label: "Delete channel",
      icon: <FolderDeleteIcon />,
    },
    {
      label: "Media",
      icon: <PermMediaIcon />,
    },
  ];

  return (
    <>
      <Box role="presentation" sx={{ width: "auto" }}>
        <Drawer
          open={open}
          keepMounted
          anchor="bottom"
          sx={{
            maxWidth: "xs",
          }}
          onClose={handleClose}
        >
          <List sx={{ border: "2px solid #80EF80", borderRadius: "15px" }}>
            {drawer.map((option, idx) => (
              <Fragment key={idx}>
                <ListItem disablePadding>
                  <ListItemButton onClick={option.action}>
                    <ListItemIcon>{option.icon}</ListItemIcon>
                    <ListItemText primary={option.label} />
                  </ListItemButton>
                </ListItem>
              </Fragment>
            ))}
          </List>
        </Drawer>
      </Box>
    </>
  );
};
