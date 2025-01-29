"use client";

import usePostAPI from "@/hooks/api/usePostAPI";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CommentInfoDrawer({
  isOpen,
  onClose,
  postId,
  commentId,
}: {
  isOpen: boolean;
  onClose: () => unknown;
  postId: string;
  commentId: string;
}) {
  const { deleteComment } = usePostAPI();
  const [, setOpen] = useState(isOpen);
  useEffect(() => setDrawerOpen(isOpen), [isOpen]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDelete = async (postId: string, commentId: string) => {
    try {
      await deleteComment(postId, commentId);
      toast.success("Deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete comment!");
    } finally {
      onClose();
      setOpen(false);
    }
  };

  const handleClose = () => {
    onClose?.();
    setOpen(false);
  };

  const commentInfo = [
    {
      label: "Delete",
      icon: <DeleteSweepOutlinedIcon sx={{ color: "var(--error)" }} />,
      action: () => handleDelete(postId, commentId),
    },
  ];

  return (
    <>
      <Box role="presentation" sx={{ width: "auto" }}>
        <Drawer
          open={drawerOpen}
          keepMounted
          anchor="bottom"
          sx={{
            maxWidth: "xs",
          }}
          onClose={handleClose}
        >
          <List>
            {commentInfo.map((option, idx) => (
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
