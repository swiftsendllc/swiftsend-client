import { GroupContextWrapper } from "@/hooks/context/group-context";
import { GroupsEntity } from "@/hooks/entities/messages.entities";
import { authCookieKey, ENV } from "@/library/constants";
import { LinearProgress } from "@mui/material";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const getGroupById = async (groupId: string) => {
  try {
    const accessToken = cookies().get(authCookieKey)?.value;
    const res = await fetch(
      `${ENV("NEXT_PUBLIC_API_URL")}/groups/${groupId}`,
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
    return data as GroupsEntity;
  } catch (error) {
    console.error(error);
  }
};

export default async function Layout({
  params,
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Record<string, string>;
}>) {
  const group = await getGroupById(params.groupId);
  if (!group?._id) {
    return (
      <>
        <LinearProgress />
      </>
    );
  }

  return (
    <>
      <GroupContextWrapper group={group}>{children}</GroupContextWrapper>
    </>
  );
}
