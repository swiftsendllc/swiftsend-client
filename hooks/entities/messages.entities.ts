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
  reactions: MessageReactionsEntity[];
}

export interface EditMessageInput {
  message: string;
}
export interface MessageUserInput {
  receiverId: string;
  message: string;
  imageURL: string;
}

export interface DeleteMessagesInput {
  messageIds: string[];
}
export interface SendMessageReactionsInput {
  reaction: string;
  messageId: string;
}

export interface MessageReactionsEntity {
  userId: string;
  messageId: string;
  reaction: string;
  _id: string;
}

export interface GroupMessagesEntity {
  _id:string
  senderId: string;
  receiversId: string[];
  channelId: string;
  message: string | null;
  imageURL: string | null;
  createdAt: Date | null;
  deletedAt: Date | null;
  editedAt: Date | null;
  deleted: boolean;
  edited: boolean;
  sender: UserProfilesEntity
  receivers:UserProfilesEntity[]
}
export interface GroupsEntity {
  _id: string;
  channelAvatar: string;
  channelName: string;
  description: string;
  createdAt: Date;
  senderId: string;
  participants: string[];
}
