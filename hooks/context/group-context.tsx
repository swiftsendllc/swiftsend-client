'use client';

import React, { createContext, useState } from 'react';
import { GroupsEntity } from '../entities/messages.entities';
import { UserProfilesEntity } from '../entities/users.entities';

const emptyGroup = {
  _id: '',
  groupName: '',
  groupAvatar: '',
  description: '',
  createdAt: new Date(),
  adminId: '',
  participants: [],
  members: [],
  moderators: [],
  _admin: {} as UserProfilesEntity,
  isAdmin: false,
  isModerator: false
} satisfies GroupsEntity;

export const GroupContext = createContext<[GroupsEntity, React.Dispatch<React.SetStateAction<GroupsEntity>>]>([
  emptyGroup,
  () => null
]);

export function GroupContextWrapper({ group, children }: { group: GroupsEntity | null; children: React.ReactNode }) {
  const [groupInfo, setGroupInfo] = useState<GroupsEntity>(group || emptyGroup);

  return <GroupContext.Provider value={[groupInfo, setGroupInfo]}>{children}</GroupContext.Provider>;
}
