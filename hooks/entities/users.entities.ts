export interface UserProfilesEntity {
  _id: string;
  userId: string;

  user: { email: string };
  fullName: string;
  username: string;
  bio: string;

  gender: string;

  pronouns: string;

  region: string;

  avatarURL: string;
  bannerURL: string;
  websiteURL: string;

  postCount: number;
  followerCount: number;
  followingCount: number;

  isOnline?: boolean;
  lastSeen: Date;
  isFollowing: boolean;
  isFollowedByMe: boolean;
  hasSubscribed: boolean;

}



export interface FollowersEntity {
  followingUserId: string;
  followedUserId: string;
  createdAt: Date;
  deletedAt: Date;
  user: UserProfilesEntity;
}
