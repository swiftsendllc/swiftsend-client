"use client";

import { UserProfilesEntity } from "@/hooks/types";
import useAPI from "@/hooks/useAPI";
import { UserContext } from "@/hooks/user-context";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function ConnectedPage() {
  const { getFollowing, unFollowProfile } = useAPI();
  const [user] = useContext(UserContext);
  const [following, setFollowing] = useState<UserProfilesEntity[]>([]);

  const loadConnected = async () => {
    try {
      const fetchFollowing = await getFollowing(user.userId);
      setFollowing(fetchFollowing);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnFollow = async (userId: string) => {
    try {
      await unFollowProfile(userId);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleFollow = async (userId: string) => {
  //   try {
  //     await followProfile(userId);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    loadConnected();
  }, []); //eslint-disable-line

  return (
    <>
      <Stack direction="row" mt={2} justifyContent="space-between">
        <IconButton href={`/${user.username}`} LinkComponent={Link}>
          <ArrowBackOutlinedIcon />
        </IconButton>
        <Typography fontWeight={200} color="primary">
          {" "}
          Connected
        </Typography>
        <IconButton>
          <MoreVertOutlinedIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Stack mb={8}>
        {following.map((followingUser, idx) => (
          <Card key={idx} sx={{ mb: 0.5, width: "100%", p: 0 }}>
            <Stack></Stack>
            <CardHeader
              avatar={
                <Avatar
                  aria-label="recipe"
                  src={followingUser.avatarURL}
                  alt={followingUser.fullName}
                />
              }
              title={
                <Typography fontWeight={200}>
                  {followingUser.fullName}
                </Typography>
              }
              subheader={
                <Typography
                  fontSize=".75rem"
                  fontWeight={200}
                  variant="subtitle2"
                >
                  {followingUser.username}
                </Typography>
              }
              action={
                <>
                  <Button
                    variant="outlined"
                    onClick={() => handleUnFollow(followingUser.userId)}
                  >
                    <PersonRemoveIcon />
                    UnFollow
                  </Button>
                </>
              }
            />
          </Card>
        ))}
      </Stack>
    </>
  );
}
