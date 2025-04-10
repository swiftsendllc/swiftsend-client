import { UserProfilesEntity } from './users.entities';

export interface PostsEntity {
  _id: string;
  userId: string;
  caption: string;
  imageUrls: string[];
  blurredImageUrls: string[];
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  isSaved: boolean;
  isFollowing: boolean;
  isPurchased: boolean;
  shareCount: number;
  saveCount: number;
  createdAt: Date;
  user: UserProfilesEntity;
  comments?: CommentsEntity[];
  saves?: SavesEntity;
  price: number;
  status: boolean;
  isExclusive: boolean;
  purchasedBy: string[];
  isMyPost: boolean;
}

export interface UploadEntity {
  originalUrl: string;
  blurredUrl: string;
}

export interface CreatePostInput {
  caption: string;
  imageURL: string;
  blurredImageURL: string;
  isExclusive: boolean;
  price: number;
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
  postId: string;
  createdAt: string;
  user: UserProfilesEntity;
}

export interface SavesEntity {
  userId: string;
  postId: string;
  reelsId: string;
}
