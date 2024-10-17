"use client";

import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Container,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import Image from "next/image";
import { cluster } from "radash";



const imageGroups = cluster(itemData, 3);

const calculateRowCols = (idx: number, igx: number) => {
  return idx % 2 === 0 && (idx === 0 ? igx % 2 === 0 : true)
    ? 1
    : igx % 2 !== 0 && idx === 1
    ? 1
    : 2;
};

export default function SearchPage() {
  return (
    <Container sx={{ p: 0 }}>
      <ImageList
        sx={{ width: "100%", height: "auto" }}
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
                src={post.img}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                alt={post.title || "image"}
                width={400}
                height={400}
                // loading="lazy"
                priority
              />
              <ImageListItemBar
                sx={{ background: "transparent" }}
                position="top"
                actionIcon={
                  <IconButton sx={{ color: "white" }} aria-label="star">
                    <StarBorderIcon />
                  </IconButton>
                }
                actionPosition="right"
              />
              <ImageListItemBar
                sx={{ background: "transparent" }}
                position="bottom"
                actionIcon={
                  <IconButton sx={{ color: "white" }} aria-label="bookmark">
                    <BookmarkBorderOutlinedIcon />
                  </IconButton>
                }
                actionPosition="right"
              />
            </ImageListItem>
          ))
        )}
      </ImageList>
    </Container>
  );
}
