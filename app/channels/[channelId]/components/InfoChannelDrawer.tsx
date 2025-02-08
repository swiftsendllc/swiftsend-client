"use client";
import { backgroundImages } from "@/public/images";
import ChecklistIcon from "@mui/icons-material/Checklist";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import {
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { setCookie } from "cookies-next";
import { useParams, useRouter } from "next/navigation";
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
  const { channelId } = useParams();
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const [imageDrawer, setImageDrawer] = useState(false);
  const router = useRouter();

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
      action: () => {
        router.push(`/channels/${channelId}/media`);
      },
    },
  ];

  return (
    <>
      <Container maxWidth="xs">
        <Drawer
          open={open}
          keepMounted
          anchor="bottom"
          sx={{
            width: "100%",
            maxWidth: 444,
            left: "50%",
            transform: "translateX(-50%)",
            position: "absolute",
          }}
          hideBackdrop
          onBlur={handleClose}
        >
          <List
            sx={{
              borderRadius: "14px",
              width: "100%",
              maxWidth: 444,
              margin: "0 auto",
            }}
          >
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
      </Container>
      <Container maxWidth="xs">
        <Drawer
          open={imageDrawer}
          keepMounted
          anchor="bottom"
          sx={{
            maxWidth: 444,
            width: "100%",
            left: "50%",
            transform: "translateX(-50%)",
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
      </Container>
    </>
  );
};
