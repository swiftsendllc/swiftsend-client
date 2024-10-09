"use client";

import { createContext, useState } from "react";

interface UserInfo {
  fullName: string;
  userId: string;
  username: string;
  pronouns?: string | null;
  gender?: string | null;
  bio?: string | null;
  links?: string | null;
  banners?: string | null;
  avatarURL?: string | null;
  user: {
    email: string;
  };
}
const emptyUser = {
  userId: "",
  fullName: "",
  avatarURL: "",
  user: { email: "" },
  username: "",
  pronouns: "",
  gender: "",
  bio: "",
  links: "",
  banners: "",
} satisfies UserInfo;

export const UserContext = createContext<
  [UserInfo, React.Dispatch<React.SetStateAction<UserInfo>>]
>([emptyUser, () => null]);

export function ContextWrapper({
  children,
  user,
}: {
  children: React.ReactNode;
  user: null;
}) {
  const [userInfo, setUserInfo] = useState<UserInfo>(user || emptyUser);
  return (
    <UserContext.Provider value={[userInfo, setUserInfo]}>
      {children}
    </UserContext.Provider>
  );
}
