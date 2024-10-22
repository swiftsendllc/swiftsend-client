"use client";
import { PostsEntity } from "@/hooks/types";

import { ImageList, ImageListItem, Stack } from "@mui/material";
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
  post: PostsEntity[];
}

export const SearchFeed = ({ post }: SearchFeedProps) => {
  const imageGroups = cluster(post, 3);
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
              </ImageListItem>
            ))
          )}
        </ImageList>
      </Stack>
    </>
  );
};
