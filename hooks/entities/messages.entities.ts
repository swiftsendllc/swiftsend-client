import { UserProfilesEntity } from './users.entities';

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
  receiver: UserProfilesEntity;
  deleted: boolean;
  edited: boolean;
  seen: boolean;
  repliedTo: string;
  reply: RepliesEntity;
  delivered: boolean;
  reactions: MessageReactionsEntity[];
}
export interface RepliesEntity {
  replierId: string;
  messageId: string;
  repliedAt: Date;
  message: string | null;
  imageURL: string | null;
  receiverId: string;
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
  _id: string;
  senderId: string;
  receiversId: string[];
  groupId: string;
  message: string;
  imageURL: string;
  createdAt: Date | null;
  deletedAt: Date | null;
  editedAt: Date | null;
  deleted: boolean;
  edited: boolean;
  sender: UserProfilesEntity;
  receivers: UserProfilesEntity[];
  reactions: GroupReactionsEntity[];
  isReacted: boolean;
  group: GroupsEntity;
}
export interface GroupsEntity {
  _id: string;
  groupAvatar: string;
  groupName: string;
  description: string;
  createdAt: Date;
  admin: string;
  moderators: string[];
  participants: string[];
  members: UserProfilesEntity[];
}
export interface SendGroupMessageInput {
  message: string | null;
  imageURL: string | null;
}

export interface GroupCreateInput {
  groupName: string;
  description: string | null;
  groupAvatar: string | null;
}
export interface GroupReactionsEntity {
  _id: string;
  reaction: string;
  messageId: string;
  senderId: string;
  createdAt: Date;
}
