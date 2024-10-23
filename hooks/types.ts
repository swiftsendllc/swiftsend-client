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
export interface PostsEntity {
  _id: string;
  userId: string;
  caption: string;
  imageURL: string;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  isSaved: boolean;
  shareCount: number;
  saveCount: number;
  createdAt: Date;
  user: UserProfilesEntity;
  comments?: CommentsEntity[];
  saves?: SavesEntity[];
}

export interface CreatePostInput {
  caption: string;
  imageURL: string;
}
export interface UpdatePostInput {
  caption: string;
}

export interface CommentPostInput {
  comment: string;
}

export interface CommentsEntity {
  _id: string;
  comment: string;
  user: UserProfilesEntity;
}

export interface SavesEntity {
  userId: string;
  postId: string;
  reelsId: string;
}
