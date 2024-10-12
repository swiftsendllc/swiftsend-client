"use client";

import { createContext, useState } from "react";

interface UserInfo {
  userId: string;
  fullName: string;
  username: string;
  pronouns?: string ;
  gender?: string ;
  bio?: string ;
  websiteURL?: string ;
  bannerURL?: string ;
  avatarURL?: string ;
  postCount: number | null;
  followerCount: number | null;
  followingCount: number | null;
  user: {
    email: string;
  };
}
const emptyUser = {
  userId: "",
  fullName: "Henry Cavil",
  avatarURL: "",
  user: { email: "" },
  username: "",
  pronouns: "",
  gender: "",
  bio: "Exploring and enjoying, creating cinematic events",
  websiteURL: "",
  bannerURL: "",
  postCount: 0,
  followerCount: 0,
  followingCount: 0,
} satisfies UserInfo;

export const UserContext = createContext<
  [UserInfo, React.Dispatch<React.SetStateAction<UserInfo>>]
>([emptyUser, () => null]);

export function ContextWrapper({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserInfo | null;
}) {
  const [userInfo, setUserInfo] = useState<UserInfo>(user || emptyUser);
  return (
    <UserContext.Provider value={[userInfo, setUserInfo]}>
      {children}
    </UserContext.Provider>
  );
}
