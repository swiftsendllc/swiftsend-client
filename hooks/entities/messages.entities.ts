import { UserProfilesEntity } from "./users.entities";

export interface ChannelsEntity {
  _id: string;
  users: string[];
  receiver: UserProfilesEntity;
  lastMessage: {
    _id: string;
    senderId: string;
    receiverId: string;
    channelId: string;
    message: string;
    imageURL: string | null;
    createdAt: Date;
    deletedAt: Date;
    editedAt: Date;
    deleted: boolean;
    edited: boolean;
  } | null;
}

export interface MessagesEntity {
  _id: string;
  senderId: string;
  receiverId: string;
  channelId: string;
  message: string;
  imageURL: string;
  createdAt: Date;
  deletedAt: Date;
  editedAt: Date;
  user: UserProfilesEntity;
  deleted: boolean;
  edited: boolean;
  seen: boolean;
  delivered: boolean;
}

export interface EditMessageInput {
  message: string;
}
export interface MessageUserInput {
  receiverId: string;
  message: string;
  imageURL: string;
}
