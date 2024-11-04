import { CreatorContextWrapper } from "@/hooks/context/creator-context";
import { UserProfilesEntity } from "@/hooks/types";
import { authCookieKey } from "@/library/constants";
import { Stack, Typography } from "@mui/material";
import { cookies } from "next/headers";
import Image from "next/image";
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
  if (!res.ok) {
    return null;
  }

  return (await res.json()) as UserProfilesEntity;
};

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Record<string, string>;
}>) {
  const user = await getUser(params.username);
  if (!user) {
    return (
      <Stack
        alignContent="center"
        alignItems="center"
        justifyContent="center"
        my={15}
      >
        <Image
          src="/svg-icons/sasuke1.svg"
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
          𝔚𝔢 𝔞𝔯𝔢 𝔲𝔫𝔞𝔳𝔞𝔦𝔩𝔞𝔟𝔩𝔢 𝔞𝔱 𝔱𝔥𝔢 𝔪𝔬𝔪𝔢𝔫𝔱.
          <br /> 𝔗𝔥𝔢𝔯𝔢 𝔦𝔰 𝔫𝔬 𝔰𝔲𝔠𝔥 𝔲𝔰𝔢𝔯.
        </Typography>
      </Stack>
    );
  }
  return (
    <>
      <CreatorContextWrapper user={user}>{children}</CreatorContextWrapper>
    </>
  );
}
