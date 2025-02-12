"use client";

import useMessageAPI from "@/hooks/api/useMessageAPI";
import { GroupsEntity } from "@/hooks/entities/messages.entities";
import { DeleteForeverOutlined } from "@mui/icons-material";
import { Avatar, Button, Card, CardHeader } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export const GroupsListPage = ({
  groups,
  setSelectedGroup,
}: {
  groups: GroupsEntity[];
  setSelectedGroup: React.Dispatch<React.SetStateAction<GroupsEntity | null>>;
}) => {
  const { deleteGroup } = useMessageAPI();
  const router = useRouter();

  const handleDeleteGroup = async (groupId: string) => {
    try {
      await deleteGroup(groupId);
      toast.success("GROUP DELETED");
    } catch (error) {
      console.log(error);
      toast.error("FAILED TO DELETE GROUP!");
    }
  };
  return (
    <>
      {groups.map((group, idx) => (
        <Card
          key={idx}
          sx={{ mb: 0.3, width: "100%", p: 0 }}
          onClick={() => {
            setSelectedGroup(group);
            router.push(`/groups/${group._id}`);
          }}
        >
          <CardHeader
            avatar={
              <>
                <Avatar
                  aria-label="recipe"
                  src={group.groupAvatar}
                  alt={group.groupAvatar}
                />
              </>
            }
            title={group.groupName}
            subheader={group.description}
            action={
              <Button
                sx={{ height: 20, fontWeight: 200 }}
                aria-label="settings"
                variant="text"
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteGroup(group._id);
                }}
              >
                <DeleteForeverOutlined />
              </Button>
            }
          />
        </Card>
      ))}
    </>
  );
};
