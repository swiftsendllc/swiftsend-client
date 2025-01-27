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
  isOnline:false,
  lastSeen: new Date(),
  isFollowing: false,
  isFollowedByMe: false,
} satisfies UserProfilesEntity;

export const CreatorContext = createContext<
  [UserProfilesEntity, React.Dispatch<React.SetStateAction<UserProfilesEntity>>]
>([emptyUser, () => null]);

export function CreatorContextWrapper({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserProfilesEntity | null;
}) {
  const [creator, setCreator] = useState<UserProfilesEntity>(user || emptyUser);
  return (
    <CreatorContext.Provider value={[creator, setCreator]}>
      {children}
    </CreatorContext.Provider>
  );
}
