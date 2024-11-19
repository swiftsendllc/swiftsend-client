import { UserProfilesEntity } from "./users.entities";


export interface ChannelsEntity {
  _id: string;
  users: string[];
  receiver: UserProfilesEntity;
  lastMessage: {
    _id: string;
    message: string;
    createdAt: string;
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
  deletedBy: string[];
  deleted: boolean;
  edited: boolean;
}

export interface EditMessageInput {
  message: string;
}
export interface MessageUserInput {
  receiverId: string;
  message: string;
  imageURL: string;
}

export interface DeleteMessageInput {
  deleted: boolean;
}


