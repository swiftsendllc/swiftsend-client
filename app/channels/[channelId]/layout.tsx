import { ChannelContextWrapper } from "@/hooks/context/channel-context";
import { ChannelsEntity } from "@/hooks/entities/messages.entities";
import { authCookieKey } from "@/library/constants";
import { Stack, Typography } from "@mui/material";
import { cookies } from "next/headers";
import Image from "next/image";

const getChannelById = async (channelId: string) => {
  const accessToken = cookies().get(authCookieKey)?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/channels/${channelId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }
  return data as ChannelsEntity;
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
      <Stack
        alignContent="center"
        alignItems="center"
        justifyContent="center"
        my={15}
      >
        <Image
          src="/svg/sasuke1.svg"
          style={{
            objectFit: "cover",
            width: "50%",
            height: "50%",
          }}
          alt="image"
          width={300}
          height={100}
          priority
        />
        <Typography variant="h6" fontWeight="50" textAlign="center" mt={5}>
          Looks like
          <br /> There is an error
        </Typography>
      </Stack>
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
