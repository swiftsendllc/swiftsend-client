import BottomNav from "@/components/BottomNav";
import { ChannelsContextWrapper } from "@/hooks/context/channels-context";
import { ChannelsEntity } from "@/hooks/entities/messages.entities";
import { authCookieKey } from "@/library/constants";
import { ENV } from "@/util/constants";
import {
  Alert,
  AlertTitle,
  Button,
  LinearProgress,
  Stack,
} from "@mui/material";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

const getChannels = async () => {
  try {
    const accessToken = cookies().get(authCookieKey)?.value;
    const res = await fetch(`${ENV("NEXT_PUBLIC_API_URL")}/channels`, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    if (!res.ok) return notFound();
    return data as ChannelsEntity[];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const channels = await getChannels();
  if (!channels) {
    return (
      <>
        <Stack
          alignContent="center"
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100vh" }}
          overflow="hidden"
        >
          <Alert severity="warning" variant="filled">
            <AlertTitle>WARNING</AlertTitle>
            SORRY TO SAY, LOOKS LIKE THERE IS AN ERROR! PLEASE TRY TO REFRESH
            THE PAGE, IF THE PROBLEM PERSISTS, CONTACT SUPPORT.
          </Alert>
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2} p={5}>
            <LinearProgress color="warning" />
          </Stack>
          <Button variant="contained" color="success" href="/channels">
            go back to home page
          </Button>
        </Stack>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <ChannelsContextWrapper channels={channels}>
        {children}
      </ChannelsContextWrapper>
    </>
  );
}
