import useAPI from '@/hooks/api/useAPI';
import useMessageAPI from '@/hooks/api/useMessageAPI';
import { ChannelContext } from '@/hooks/context/channel-context';
import HardwareIcon from '@mui/icons-material/Hardware';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useContext, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface ChannelListMenuProps {
  expanded: boolean | null;
}

export function ChannelListExpanded({ expanded }: ChannelListMenuProps) {
  const { uploadFile } = useAPI();
  const [file, setFile] = useState<File>();
  const { updateChannel } = useMessageAPI();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [channel, setChannel] = useContext(ChannelContext);
  const [muted, setMuted] = useState<boolean>(channel.isMuted);
  const [pinned, setPinned] = useState<boolean>(channel.isPinned);
  const [updateDialog, setUpdateDialog] = useState<boolean>(false);

  const handleUpload = async () => {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { url } = await uploadFile(formData);
      return url;
    } catch {
      return channel.backgroundImage;
    }
  };

  const handleUpdateChannel = async () => {
    try {
      const url = await handleUpload();

      const updated = await updateChannel(
        { isMuted: muted, isPinned: pinned, backgroundImage: url || channel.backgroundImage },
        channel._id
      );
      setChannel((prev) => ({ ...prev, ...updated }));
      handleClose();
      toast.success('The channel is updated');
    } catch (error) {
      console.error(error);
      toast.error('Oops! Something wrong happened!');
      handleClose();
    }
  };

  const handleClose = () => {
    setUpdateDialog(false);
  };

  const handleDefault = () => {
    setMuted(channel.isMuted);
    setPinned(channel.isPinned);
    handleClose();
  };

  const options = [
    {
      label: 'Wallpaper',
      icon: <WallpaperIcon />,
      action: () => {
        inputRef.current?.click();
      }
    },
    {
      label: pinned ? 'Unpin channel' : 'Pin Channel',
      icon: <HardwareIcon />,
      action: () => {
        setUpdateDialog(true);
        setPinned((prev) => !prev);
      }
    },
    {
      label: muted ? 'Unmute channel' : 'Mute channel',
      icon: <VolumeOffIcon />,
      action: () => {
        setUpdateDialog(true);
        setMuted((prev) => !prev);
      }
    }
  ];

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        hidden
        onChange={(event) => {
          const input = event.target;
          if (!input.files?.length) return;
          const file = input.files[0];
          setFile(file);
          setUpdateDialog(true);
        }}
      />
      {expanded &&
        options.map((option, idx) => (
          <ListItemButton key={idx} sx={{ p: 0, m: 0 }} onClick={option.action}>
            <ListItem
              sx={{
                maxHeight: 72,
                transform: 'all 0.3s ease-in-out',
                cursor: 'pointer',
                boxShadow: 1,
                display: 'flex'
              }}
            >
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText>{option.label}</ListItemText>
            </ListItem>
          </ListItemButton>
        ))}
      <Dialog open={updateDialog} onClose={handleClose}>
        <DialogTitle>Update your channel settings</DialogTitle>
        <DialogActions>
          <Button onClick={handleUpdateChannel} variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={handleDefault}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
