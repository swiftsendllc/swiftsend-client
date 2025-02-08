import BottomNav from "@/components/BottomNav";
import { CreatorContextWrapper } from "@/hooks/context/creator-context";
import { UserProfilesEntity } from "@/hooks/entities/users.entities";
import { authCookieKey, ENV } from "@/library/constants";
import {
  Alert,
  AlertTitle,
  Button,
  Container,
  LinearProgress,
  Stack,
} from "@mui/material";
import { cookies } from "next/headers";
import React from "react";

const getUser = async (username: string) => {
  const accessToken = cookies().get(authCookieKey)?.value;

  const res = await fetch(`${ENV("NEXT_PUBLIC_API_URL")}/users/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    return null;
  }

  return (await res.json()) as UserProfilesEntity;
};

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Record<string, string>;
}>) {
  const user = await getUser(params.username);

  if (!user) {
    return (
      <>
        <Container maxWidth="xs">
          <Stack
            alignContent="center"
            alignItems="center"
            justifyContent="center"
            mb={15}
            mt={5}
            overflow="hidden"
          >
            <Alert severity="warning" variant="filled">
              <AlertTitle>Error</AlertTitle>
              SORRY TO SAY, LOOKS LIKE THERE IS AN ERROR!
            </Alert>
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2} p={5}>
              <LinearProgress color="warning" />
            </Stack>
            <Button variant="contained" color="success" href="/home">
              go back to home page
            </Button>
          </Stack>
        </Container>

        <BottomNav />
      </>
    );
  }
  return (
    <>
      <CreatorContextWrapper user={user}>{children}</CreatorContextWrapper>
    </>
  );
}
