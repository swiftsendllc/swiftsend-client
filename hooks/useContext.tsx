"use client";

import { createContext, useState } from "react";

interface UserInfo {
  fullName: string;
  userId: string;
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
