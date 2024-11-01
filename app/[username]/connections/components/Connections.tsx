"use client";

import { CreatorContext } from "@/hooks/creator-context";
import { UserProfilesEntity } from "@/hooks/types";
import useAPI from "@/hooks/useAPI";
import { UserContext } from "@/hooks/user-context";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Divider,
  Fab,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function ConnectionPage() {
  const { getFollowers, followProfile, getUserProfile } = useAPI();
  const [user] = useContext(UserContext);
  const [creator] = useContext(CreatorContext);
  const [followers, setFollowers] = useState<UserProfilesEntity[]>([]);
  const [, setSelectedUser] = useState<UserProfilesEntity | null>(null);
  const [, setIsCardOpen] = useState(false);
  const router = useRouter();

  const loadConnections = async (userId: string) => {
    try {
      const fetchFollowers = await getFollowers(userId);
      setFollowers(fetchFollowers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async (userId: string) => {
    try {
      await followProfile(userId);
      setSelectedUser(null); // clear selected user after following
      loadConnections(creator.userId); // refresh followers to update follow status
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    setIsCardOpen(true);
  };

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
    loadConnections(creator.userId);
  }, [creator.userId]); //eslint-disable-line

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignContent="center"
        alignItems="center"
      >
        <IconButton href={`/${creator.username}`} LinkComponent={Link}>
          <ArrowBackOutlinedIcon />
        </IconButton>
        <TextField
          label="Search your connections"
          sx={{ width: "75%" }}
          slotProps={{
            inputLabel: {
              sx: {
                typography: "text.secondary",
                fontWeight:"200"
              }
            },
            input: {
              sx: { borderRadius: "10px" , },
            },
          }}
          onClick={handleSearch}
        />
        <Fab
          sx={{ width: 40, height: 40 }}
          color="secondary"
          aria-label="edit"
          variant="circular"
        >
          <FilterAltOutlinedIcon />
        </Fab>
      </Stack>
      <Divider />
      <Stack>
        {followers.map((followedUser, idx) => (
          <Card key={idx} sx={{ mb: 0.5, width: "100%", p: 0 }}>
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
                followedUser.following ? (
                  `˗ˏˋ ★ ˎˊ˗`
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => {
                      setSelectedUser(followedUser);
                      handleFollow(followedUser.userId);
                    }}
                  >
                    <PersonAddIcon />
                    Follow
                  </Button>
                )
              }
            />
          </Card>
        ))}
      </Stack>
    </>
  );
}
