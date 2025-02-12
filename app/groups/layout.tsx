import BottomNav from "@/components/BottomNav";
import { GroupsContextWrapper } from "@/hooks/context/groups-context";
import { GroupsEntity } from "@/hooks/entities/messages.entities";
import { authCookieKey, ENV } from "@/library/constants";
import { Stack, Typography } from "@mui/material";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const getGroups = async () => {
  try {
    const accessToken = cookies().get(authCookieKey)?.value;
    const res = await fetch(`${ENV("NEXT_PUBLIC_API_URL")}/groups`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    if (!res.ok) return notFound();
    return data as GroupsEntity[];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const groups = await getGroups();
  if (!groups) {
    return (
      <>
        <Stack
          alignContent="center"
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100vh" }}
          overflow="hidden"
        >
          <Typography>YOUR GROUPS WILL APPEAR HERE!</Typography>
        </Stack>
        <BottomNav />
      </>
    );
  }
  return (
    <>
      <GroupsContextWrapper groups={groups}>{children}</GroupsContextWrapper>
    </>
  );
}
