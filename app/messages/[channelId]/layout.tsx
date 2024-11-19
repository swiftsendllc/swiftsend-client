import { ChannelContextWrapper } from "@/hooks/context/channel-context";
import { ChannelsEntity } from "@/hooks/entities/messages.entities";
import { authCookieKey } from "@/library/constants";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

const getChannel = async (channelId: string) => {
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
  if (!res.ok) notFound();

  return (await res.json()) as ChannelsEntity;
};

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Record<string, string>;
}>) {
  const channel = await getChannel(params.channelId);

  return (
    <>
      <ChannelContextWrapper channel={channel}>
        {children}
      </ChannelContextWrapper>
    </>
  );
}
