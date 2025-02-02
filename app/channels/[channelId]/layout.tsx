import BottomNav from "@/components/BottomNav";
import { ChannelContextWrapper } from "@/hooks/context/channel-context";
import { ChannelsEntity } from "@/hooks/entities/messages.entities";
import { authCookieKey } from "@/library/constants";
import { ENV } from "@/util/constants";
import {
  Alert,
  AlertTitle,
  Button,
  Container,
  LinearProgress,
  Stack,
} from "@mui/material";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const getChannelById = async (channelId: string) => {
  try {
    const accessToken = cookies().get(authCookieKey)?.value;
    const res = await fetch(
      `${ENV("NEXT_PUBLIC_API_URL")}/channels/${channelId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) return notFound();
    return data as ChannelsEntity;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Record<string, string>;
}>) {
  const channel = await getChannelById(params.channelId);

  if (!channel) {
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
              <AlertTitle>WARNING</AlertTitle>
              SORRY TO SAY, LOOKS LIKE THERE IS AN ERROR! PLEASE TRY TO REFRESH
              THE PAGE, IF THE PROBLEM PERSISTS, CONTACT SUPPORT.
            </Alert>
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2} p={5}>
              <LinearProgress color="warning" />
            </Stack>
            <Button variant="contained" color="success">
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
      <ChannelContextWrapper channel={channel}>
        {children}
      </ChannelContextWrapper>
    </>
  );
}
