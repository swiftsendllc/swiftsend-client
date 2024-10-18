"use client";
import EditPostModal from "@/app/posts/components/EditPostModal";
import { PostsEntity } from "@/hooks/types";
import useAPI from "@/hooks/useAPI";
import CameraAltSharpIcon from "@mui/icons-material/CameraAltSharp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";

import { useEffect, useState } from "react";

const options = [
  {
    label: "Edit",
  },
  {
    label: "Delete",
  },
];

export default function AccountPage() {
  const { getPosts } = useAPI();
  const [posts, setPosts] = useState<PostsEntity[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [editPostModal, setEditPostModal] = useState(false);

  const loadPosts = async () => {
    try {
      const posts = await getPosts();
      setPosts(posts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMenuItemClick = (option: string) => {
    setAnchorEl(null);
    if (option === "Edit") {
      setEditPostModal(true);
    }
  };

  return (
    <>
      <Box mb={6}>
        {posts.length === 0 ? (
          <Stack
            my="10"
            alignContent="center"
            alignItems="center"
            justifyContent="center"
          >
            <CameraAltSharpIcon sx={{ width: 60, height: 60 }} />
            <Typography variant="h5" fontWeight="100">
              No Image
            </Typography>
            <Typography variant="h6" fontWeight="50">
              This user has no image.
            </Typography>
          </Stack>
        ) : (
          <ImageList
            sx={{ width: "100%", height: "auto" }}
            cols={3}
            gap={4}
            rowHeight={164}
          >
            {posts.map((post) => (
              <ImageListItem key={post._id}>
                <Image
                  src={post.imageURL}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                  alt={post.caption || "image"}
                  width={300}
                  height={100}
                  priority
                />
                <ImageListItemBar
                  sx={{ background: "transparent" }}
                  position="top"
                  actionIcon={
                    <>
                      <IconButton
                        sx={{ color: "white" }}
                        aria-label="options"
                        id="long-button"
                        aria-haspopup="true"
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => setAnchorEl(null)}
                      >
                        {options.map((option, idx) => (
                          <MenuItem key={idx} onClick={() => handleMenuItemClick(option.label)}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </>
                  }
                  actionPosition="right"
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>
      <EditPostModal
        isOpen={editPostModal}
        onClose={() => setEditPostModal(false)}
      />
    </>
  );
}
