import { CommentsEntity } from "@/hooks/entities/posts.entities";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, IconButton, Paper, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import CommentInfoDrawer from "./CommentInfo";

export const CommentStack = ({
  comment,
  postId,
  onDelete,
}: {
  comment: CommentsEntity;
  postId: string;
  onDelete: () => unknown;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Stack key={comment._id} direction="row" spacing={1} mt={2}>
        <Avatar src={comment.user.avatarURL} alt={comment.user.fullName} />
        <Paper
          sx={{ width: "100%", backgroundColor: "inherit" }}
          variant="elevation"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignContent="center"
            alignItems="center"
          >
            <Typography ml={1} py={0}>
              {comment.user.fullName}
            </Typography>
            <Typography ml={1} py={0}>
              {moment(comment.createdAt).fromNow()}
            </Typography>
            <IconButton onClick={() => setIsOpen(true)}>
              <MoreVertIcon />
            </IconButton>
          </Stack>

          <Typography
            mx={1}
            mb={1}
            variant="subtitle2"
            fontWeight={200}
            color="textSecondary"
          >
            {comment.comment}
          </Typography>
        </Paper>
      </Stack>

      {isOpen && (
        <CommentInfoDrawer
          isOpen={true}
          onClose={() => {
            setIsOpen(false);
            onDelete();
          }}
          postId={postId}
          commentId={comment._id}
        />
      )}
    </>
  );
};
