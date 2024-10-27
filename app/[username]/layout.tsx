import { CreatorContextWrapper } from "@/hooks/creator-context";
import { UserProfilesEntity } from "@/hooks/types";
import { authCookieKey } from "@/library/constants";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

const getUser = async (username: string) => {
  const accessToken = cookies().get(authCookieKey)?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!res.ok) notFound();

  return (await res.json()) as UserProfilesEntity;
};

export default async function Layout({
  children,
  params,
  account,
}: Readonly<{
  children: React.ReactNode;
  account: React.ReactNode;
  params: Record<string, string>;
}>) {
  const user = await getUser(params.username);

  return (
    <>
      <CreatorContextWrapper user={user}>
        {account}
        {children}
      </CreatorContextWrapper>
    </>
  );
}
