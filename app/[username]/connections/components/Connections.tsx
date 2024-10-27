"use client";

import { UserProfilesEntity } from "@/hooks/types";
import useAPI from "@/hooks/useAPI";
import { UserContext } from "@/hooks/user-context";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
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
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function ConnectionPage() {
  const { getFollowers, followProfile, getUserProfile } = useAPI();
  const [user] = useContext(UserContext);
  const [followers, setFollowers] = useState<UserProfilesEntity[]>([]);
  const router = useRouter();

  const loadConnections = async () => {
    try {
      const fetchFollowers = await getFollowers(user.userId);
      setFollowers(fetchFollowers);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFollow = async (userId: string) => {
    try {
      await followProfile(userId);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleUnFollow = async (userId: string) => {
  //   try {
  //     await unFollowProfile(userId);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const loadProfile = async (userId: string) => {
    try {
      const getUser = await getUserProfile(userId);
      const username = getUser.username;
      router.push(`/users/${username}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadConnections();
  }, []);
  return (
    <>
      <Stack direction="row" mt={2} justifyContent="space-between">
        <IconButton href="/account" LinkComponent={Link}>
          <ArrowBackOutlinedIcon />
        </IconButton>
        <Typography fontWeight={200} color="primary">
          {" "}
          Connections
        </Typography>
        <IconButton>
          <MoreVertOutlinedIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Stack>
        {followers.map((followedUser, idx) => (
          <Card key={idx} sx={{ mb: 0.5, width: "100%", p: 0, m: 0 }}>
            <CardHeader
              avatar={
                <Avatar
                  aria-label="recipe"
                  src={followedUser.avatarURL}
                  alt={followedUser.fullName}
                />
              }
              title={
                <Button onClick={() => loadProfile(user.userId)}>
                  <Typography fontWeight={200}>
                    {followedUser.fullName}
                  </Typography>
                </Button>
              }
              subheader={
                <Typography
                  fontWeight={200}
                  fontSize=".75rem"
                  variant="subtitle2"
                >
                  {followedUser.username}
                </Typography>
              }
              action={
                <>
                  <Button
                    variant="contained"
                    onClick={() => handleFollow(followedUser.userId)}
                  >
                    <PersonAddIcon />
                    Follow
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
