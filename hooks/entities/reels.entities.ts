import { CommentsEntity, SavesEntity } from "./posts.entities";
import { UserProfilesEntity } from "./users.entities";

export interface CreateReelInput {
  caption: string;
  videoURL: string;
}
export interface ReelsEntity {
  _id: string;
  userId: string;
  caption: string;
  videoURL: string;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  isSaved: boolean;
  isFollowing: boolean;
  shareCount: number;
  saveCount: number;
  createdAt: Date;
  user: UserProfilesEntity;
  comments?: CommentsEntity[];
  saves?: SavesEntity[];
}