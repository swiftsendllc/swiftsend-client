export interface UserProfilesEntity {
  _id:string
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

  following: boolean;
  isOnline?: boolean;
  lastSeen: Date
}

export interface UpdateUserInput {
  username: string;
  website: string;
  bannerURL: string;
  pronouns: string;
  bio: string;
  avatarURL: string;
  websiteURL: string;
}

export interface FollowersEntity {
  followingUserId: string;
  followedUserId: string;
  createdAt: Date;
  deletedAt: Date;
}