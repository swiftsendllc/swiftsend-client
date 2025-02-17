"use client";

import { GroupsEntity } from "@/hooks/entities/messages.entities";
import { InfoOutlined } from "@mui/icons-material";
import { Avatar, Button, Card, CardHeader } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export default function GroupsList({
  groups,
}: {
  groups: GroupsEntity[];
}) {
  const router = useRouter();

  return (
    <>
      {groups.map((group, idx) => (
        <Card
          key={idx}
          sx={{ mb: 0.3, width: "100%", p: 0 }}
          onClick={() => {
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
              >
                <InfoOutlined />
              </Button>
            }
          />
        </Card>
      ))}
    </>
  );
}
