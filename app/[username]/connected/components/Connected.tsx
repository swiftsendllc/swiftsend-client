"use client";

import { StyledBadge } from "@/components/SearchComponents";
import useAPI from "@/hooks/api/useAPI";
import { CreatorContext } from "@/hooks/context/creator-context";
import { FollowersEntity } from "@/hooks/entities/users.entities";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import ConnectedModal from "../../components/ConnectedModal";

export default function ConnectedPage() {
  const { getFollowing } = useAPI();
  const [creator] = useContext(CreatorContext);
  const [following, setFollowing] = useState<FollowersEntity[]>([]);
  const [connectedModal, setConnectedModal] = useState(false);
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<FollowersEntity | null>(
    null
  );
  const loadConnected = async (userId: string) => {
    try {
      const fetchFollowing = await getFollowing(userId);
      setFollowing(fetchFollowing);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadConnected(creator.userId);
  }, [creator.userId]); //eslint-disable-line

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignContent="center"
        alignItems="center"
      >
        <IconButton onClick={() => router.back()}>
          <ArrowBackOutlinedIcon />
        </IconButton>
        <TextField
          label="Search your connected"
          sx={{ width: "75%" }}
          slotProps={{
            inputLabel: {
              sx: {
                typography: "text.secondary",
                fontWeight: "200",
              },
            },
            input: {
              sx: { borderRadius: "10px" },
            },
          }}
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
      <Stack mb={8}>
        {following.length === 0 ? (
          <Stack
            my="10"
            alignContent="center"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src="/svg/tomoe.svg"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
              alt="image"
              width={300}
              height={100}
              priority
            />
            <Image
              src="/svg/sharingan.svg"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
              alt="image"
              width={300}
              height={100}
              priority
            />

            <Typography variant="h6">
              𝔜𝔬𝔲𝔯 𝔣𝔯𝔦𝔢𝔫𝔡𝔰 𝔴𝔦𝔩𝔩 𝔞𝔭𝔭𝔢𝔞𝔯 𝔥𝔢𝔯𝔢𝔢𝔢𝔢𝔢!!!!!!
            </Typography>
          </Stack>
        ) : (
          following.map((followingUser, idx) => (
            <Card key={idx} sx={{ mb: 0.5, width: "100%", p: 0 }}>
              <CardHeader
                avatar={
                  <StyledBadge
                    isOnline={followingUser.user.isOnline}
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent
                    variant="dot"
                  >
                    <Avatar
                      aria-label="recipe"
                      src={followingUser.user.avatarURL}
                      alt={followingUser.user.fullName}
                    />
                  </StyledBadge>
                }
                title={
                  <Button
                    onClick={() =>
                      router.push(`/${followingUser.user.username}`)
                    }
                  >
                    <Typography fontWeight={200}>
                      {followingUser.user.fullName}
                    </Typography>
                  </Button>
                }
                subheader={
                  <Typography
                    fontSize=".75rem"
                    fontWeight={200}
                    variant="subtitle2"
                  >
                    {followingUser.user.username}
                  </Typography>
                }
                action={
                  <>
                    <Fab
                      aria-label="add"
                      variant="extended"
                      sx={{
                        width: "100%",
                        borderRadius: "30px",
                      }}
                      color="inherit"
                      onClick={() => {
                        setSelectedUser(followingUser);
                        setConnectedModal(true);
                      }}
                    >
                      <Typography color="primary">Connected </Typography>
                    </Fab>
                  </>
                }
              />
            </Card>
          ))
        )}
      </Stack>

      {selectedUser && (
        <ConnectedModal
          isOpen={connectedModal}
          onClose={() => setConnectedModal(false)}
          user={selectedUser}
          onUnFollow={(unFollowedUserId) => {
            setFollowing((prev) =>
              prev.filter(
                (follower) => follower.user.userId !== unFollowedUserId
              )
            );
          }}
        />
      )}
    </>
  );
}
