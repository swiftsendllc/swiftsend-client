import useMessageAPI from "@/hooks/api/useMessageAPI";
import { ChannelsEntity } from "@/hooks/types";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function InfoChannelDrawer({
  isOpen,
  onClose,
  channel,
}: {
  isOpen: boolean;
  onClose?: () => unknown;
  channel: ChannelsEntity;
}) {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const { deleteChannelMessages } = useMessageAPI();

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const handleDeleteChannelMessages = async () => {
    try {
      await deleteChannelMessages(channel._id);
      handleClose();
      toast.success("Deleted channel messages");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete channel messages!");
    }
  };

  const drawer = [
    {
      label: "Delete channel",
      icon: <LayersClearIcon />,
      action: () => handleDeleteChannelMessages(),
    },
    {
      label: " Edit",
      icon: <LayersClearIcon />,
    },
    {
      label: "Daniel",
      icon: <LayersClearIcon />,
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
}
