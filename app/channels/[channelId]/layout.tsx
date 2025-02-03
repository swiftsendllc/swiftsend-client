import { ChannelContextWrapper } from "@/hooks/context/channel-context";
import { ChannelsEntity } from "@/hooks/entities/messages.entities";
import { authCookieKey } from "@/library/constants";
import { ENV } from "@/util/constants";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

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
  const { channelId } = params;

  if (!channel || channel._id !== channelId) {
    redirect(`/channels`);
  }

  return (
    <>
      <ChannelContextWrapper channel={channel}>
        {children}
      </ChannelContextWrapper>
    </>
  );
}
