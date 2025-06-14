import { ChannelContextWrapper } from '@/hooks/context/channel-context';
import { ChannelsEntity } from '@/hooks/entities/messages.entities';
import { authCookieKey, ENV } from '@/library/constants';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

const getChannelById = async (channelId: string) => {
  try {
    const accessToken = cookies().get(authCookieKey)?.value;
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/channels/${channelId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
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
  params
}: {
  children: React.ReactNode;
  params: Record<string, string>;
}) {
  const channel = await getChannelById(params.channelId);

  return (
    <>
      <ChannelContextWrapper channel={channel}>{children}</ChannelContextWrapper>
    </>
  );
}
