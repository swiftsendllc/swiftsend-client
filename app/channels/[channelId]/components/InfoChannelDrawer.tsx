import { backgroundImages } from "@/public/images";
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
import { setCookie } from "cookies-next";
import React, { Fragment, useEffect, useState } from "react";

export const InfoChannelDrawer = ({
  isOpen,
  onClose,
  setCheckBox,
  setBackgroundImage,
}: {
  isOpen: boolean;
  onClose?: () => unknown;
  setCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
  setBackgroundImage: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const [imageDrawer, setImageDrawer] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setImageDrawer(false);
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
      label: "Change background",
      icon: <WallpaperIcon />,
      action: () => {
        setImageDrawer(true);
      },
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
      <Box role="presentation" sx={{ width: "auto", height: "50%" }}>
        <Drawer
          open={imageDrawer}
          keepMounted
          anchor="bottom"
          sx={{
            maxWidth: "xs",
            maxHeight: "50%",
          }}
          onClose={handleClose}
        >
          <List sx={{ border: "2px solid #80EF80", borderRadius: "15px" }}>
            {backgroundImages.map((option, idx) => (
              <Fragment key={idx}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setBackgroundImage(option.imageURL);
                      setCookie("imageURL", option.imageURL);
                      handleClose();
                    }}
                  >
                    <ListItemText primary={option.title} />
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
