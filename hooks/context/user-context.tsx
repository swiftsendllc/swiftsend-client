"use client";

import { createContext, useState } from "react";
import { UserProfilesEntity } from "../entities/users.entities";

const emptyUser = {
  _id: "",
  userId: "",
  fullName: "",
  avatarURL: "",
  user: { email: "" },
  username: "",
  pronouns: "",
  gender: "",
  bio: "",
  websiteURL: "",
  bannerURL: "",
  postCount: 0,
  followerCount: 0,
  followingCount: 0,
  region: "",
  isFollowing: false,
  isFollowedByMe:false,
  isOnline: false,
  lastSeen: new Date(),
} satisfies UserProfilesEntity;

export const UserContext = createContext<
  [UserProfilesEntity, React.Dispatch<React.SetStateAction<UserProfilesEntity>>]
>([emptyUser, () => null]);

export function UserContextWrapper({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserProfilesEntity | null;
}) {
  const [userInfo, setUserInfo] = useState<UserProfilesEntity>(
    user || emptyUser
  );
  return (
    <UserContext.Provider value={[userInfo, setUserInfo]}>
      {children}
    </UserContext.Provider>
  );
}
