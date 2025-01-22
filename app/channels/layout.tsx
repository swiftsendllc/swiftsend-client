import { ChannelsContextWrapper } from "@/hooks/context/channels-context";
import { SocketContextWrapper } from "@/hooks/context/socket-context";
import { ChannelsEntity } from "@/hooks/entities/messages.entities";
import { authCookieKey } from "@/library/constants";
import { cookies } from "next/headers";
import React from "react";

const getChannels = async () => {
  const accessToken = cookies().get(authCookieKey)?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/channels`, {
    method: "GET",
    headers: {
      Content_Type: "Application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data as ChannelsEntity[];
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const channels = await getChannels();

  return (
    <>
      <ChannelsContextWrapper channels={channels}>
        <SocketContextWrapper serverURL={process.env.NEXT_PUBLIC_API_URL!}>
          {children}
        </SocketContextWrapper>
      </ChannelsContextWrapper>
    </>
  );
}
