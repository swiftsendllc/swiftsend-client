import { backgroundImages } from '@/public/images';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import { Dialog, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { setCookie } from 'cookies-next';
import { useParams, useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';

interface InfoChannelDrawerProps {
  isOpen: boolean;
  onClose?: () => unknown;
  setCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
  setBackgroundImage: React.Dispatch<React.SetStateAction<string | null>>;
}

export function InfoChannelDrawer({ isOpen, onClose, setCheckBox, setBackgroundImage }: InfoChannelDrawerProps) {
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

  const drawerOptions = [
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
        maxWidth="xs"
        fullWidth
        PaperProps={{
          style: {
            width: '100%',
            margin: 0
          }
        }}
        onClose={handleClose}
        aria-labelledby="info-channel-drawer"
      >
        <List
          sx={{
            borderRadius: '14px',
            width: '100%'
          }}
        >
          {drawerOptions.map((option, idx) => (
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
            width: '100%',
            margin: 0
          }
        }}
        aria-labelledby="wallpaper-drawer"
        onClose={handleClose}
      >
        <List sx={{ border: '2px solid #80EF80', borderRadius: '15px' }}>
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
}
