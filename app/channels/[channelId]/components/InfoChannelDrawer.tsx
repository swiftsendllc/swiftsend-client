'use client';
import { backgroundImages } from '@/public/images';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import {
  Dialog,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { setCookie } from 'cookies-next';
import { useParams, useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';

export const InfoChannelDrawer = ({
  isOpen,
  onClose,
  setCheckBox,
  setBackgroundImage
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
      label: 'Select',
      icon: <ChecklistIcon />,
      action: () => {
        setCheckBox(true);
        handleClose();
      }
    },
    {
      label: 'Change background',
      icon: <WallpaperIcon />,
      action: () => {
        setImageDrawer(true);
      }
    },
    {
      label: 'Delete channel',
      icon: <FolderDeleteIcon />
    },
    {
      label: 'Media',
      icon: <PermMediaIcon />,
      action: () => {
        router.push(`/channels/${channelId}/media`);
      }
    }
  ];

  return (
    <>
      <Dialog
        open={open}
        keepMounted
        fullWidth
        maxWidth="xs"
        aria-describedby="channel-dialog-open"
        PaperProps={{
          style: {
            margin: 0,
            width: '100%'
          }
        }}
        onClose={handleClose}
      >
        <List
          sx={{
            width: '100%'
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
      </Dialog>
      <Dialog
        open={imageDrawer}
        keepMounted
        fullWidth
        maxWidth="xs"
        PaperProps={{
          style: {
            margin: 0,
            width: '100%'
          }
        }}
        aria-describedby="background-image-change-dialog-open"
        onClose={handleClose}
      >
        <List sx={{ width: '100%' }}>
          {backgroundImages.map((option, idx) => (
            <Fragment key={idx}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setBackgroundImage(option.imageURL);
                    setCookie('imageURL', option.imageURL);
                    handleClose();
                  }}
                >
                  <ListItemText primary={option.title} />
                </ListItemButton>
              </ListItem>
            </Fragment>
          ))}
        </List>
      </Dialog>
    </>
  );
};
