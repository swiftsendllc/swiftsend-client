"use client";
import { PostsEntity } from "@/hooks/types";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { cluster } from "radash";

const calculateRowCols = (idx: number, igx: number) => {
  return idx % 2 === 0 && (idx === 0 ? igx % 2 === 0 : true)
    ? 1
    : igx % 2 !== 0 && idx === 1
    ? 1
    : 2;
};

interface SearchFeedProps {
  posts: PostsEntity[];
}

export default function SearchFeed({ posts }: SearchFeedProps) {
  const imageGroups = cluster(posts, 3);

  return (
    <>
      <Stack>
        <ImageList
          sx={{ width: "100%", height: "auto", margin: "0" }}
          cols={3}
          gap={4}
          rowHeight={125}
        >
          {imageGroups.map((images, igx) =>
            images.map((post, idx) => (
              <ImageListItem
                key={idx}
                rows={calculateRowCols(idx, igx)}
                cols={calculateRowCols(idx, igx)}
              >
                <Image
                  src={post.imageURL}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                  alt={post.caption || "image"}
                  width={400}
                  height={400}
                  priority
                />
                <ImageListItemBar
                  subtitle={`@${post.user.username}`}
                  actionIcon={
                    <IconButton
                      sx={{
                        backgroundColor: "transparent",
                        color: "rgba(255, 255, 255, 0.54)",
                      }}
                      aria-label={`save ${post.imageURL} `}
                    >
                      <BookmarkBorderIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))
          )}
        </ImageList>
      </Stack>
    </>
  );
}
