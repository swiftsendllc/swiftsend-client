"use client";

import { createContext, useState } from "react";
import { GroupsEntity } from "../entities/messages.entities";

export const GroupsContext = createContext<
  [
    GroupsEntity[],
    React.Dispatch<React.SetStateAction<GroupsEntity[]>>
  ]
>([[], () => null]);

export function GroupsContextWrapper({
  groups,
  children,
}: {
  groups: GroupsEntity[];
  children: React.ReactNode;
}) {
  const [groupsInfo, setGroupsInfo] = useState<
    GroupsEntity[]
  >(groups || []);
  return (
    <GroupsContext.Provider
      value={[groupsInfo, setGroupsInfo]}
    >
      {children}
    </GroupsContext.Provider>
  );
}
