export interface UpdateUserInput {
  username: string;
  website: string;
  bannerURL: string;
  pronouns: string;
  bio: string;
  avatarURL: string;
  websiteURL: string;
}
export interface UserProfilesEntity {
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
}

// posts
export interface PostsEntity{
  _id: string;
   userId: string;
  caption: string;
  imageURL: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  saveCount: number;
  createdAt: Date;
}

export interface CreatePostInput {
  caption: string;
  imageURL: string;
}
export interface UpdatePostInput {
  caption: string;
}

