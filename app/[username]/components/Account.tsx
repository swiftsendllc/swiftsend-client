"use client";
import DeletePostModal from "@/app/posts/components/DeletePostModal";
import EditPostModal from "@/app/posts/components/EditPostModal";
import usePostAPI from "@/hooks/api/usePostAPI";
import { CreatorContext } from "@/hooks/context/creator-context";
import { UserContext } from "@/hooks/context/user-context";
import { PostsEntity } from "@/hooks/entities/posts.entities";
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

import { useContext, useEffect, useState } from "react";

const options = [
  {
    label: "Edit",
  },
  {
    label: "Delete",
  },
];

export default function AccountPostPage() {
  const { getCreatorPosts } = usePostAPI();
  const [posts, setPosts] = useState<PostsEntity[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [editPostModal, setEditPostModal] = useState(false);
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostsEntity | null>(null);

  const [creator] = useContext(CreatorContext);
  const [user] = useContext(UserContext);

  const loadPosts = async (userId: string) => {
    try {
      const posts = await getCreatorPosts(userId);
      setPosts(posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadPosts(creator.userId);
  }, [creator.userId]); //eslint-disable-line

  const handleMenuItemClick = (option: string) => {
    setAnchorEl(null);
    if (option !== "Delete") {
      setEditPostModal(true);
    } else {
      setDeletePostModal(true);
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
            <Image
              src="/svg/sasuke1.svg"
              style={{
                objectFit: "cover",
                width: "50%",
                height: "50%",
              }}
              alt="image"
              width={300}
              height={100}
              priority
            />
            <Typography variant="h6" fontWeight="50">
              𝕿𝖍𝖎𝖘 𝖚𝖘𝖊𝖗 𝖍𝖆𝖘 𝖓𝖔 𝖎𝖒𝖆𝖌𝖊!!!!
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
                {user.userId !== creator.userId ? null : (
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
                          onClick={(e) => {
                            setAnchorEl(e.currentTarget);
                            setSelectedPost(post);
                          }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={() => {
                            setAnchorEl(null);
                            setSelectedPost(null);
                          }}
                        >
                          {options.map((option, idx) => (
                            <MenuItem
                              key={idx}
                              onClick={() => handleMenuItemClick(option.label)}
                            >
                              {option.label}
                            </MenuItem>
                          ))}
                        </Menu>
                      </>
                    }
                    actionPosition="right"
                  />
                )}
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>
      {selectedPost && (
        <EditPostModal
          post={selectedPost}
          isOpen={editPostModal}
          onClose={() => setEditPostModal(false)}
        />
      )}
      {selectedPost && (
        <DeletePostModal
          post={selectedPost}
          isOpen={deletePostModal}
          onClose={() => setDeletePostModal(false)}
        />
      )}
    </>
  );
}
