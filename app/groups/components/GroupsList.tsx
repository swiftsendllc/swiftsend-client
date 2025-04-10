'use client';

import { GroupsEntity } from '@/hooks/entities/messages.entities';
import { InfoOutlined } from '@mui/icons-material';
import { Avatar, Button, Card, CardHeader, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function GroupsList({ groups }: { groups: GroupsEntity[] }) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <>
      {groups.map((group, idx) => (
        <Card
          key={idx}
          sx={{
            mb: 0.3,
            width: '100%',
            p: 0,
            transform: 'all 0.3s ease',
            cursor: 'pointer',
            boxShadow: 1,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
              boxShadow: 4,
              transform: 'scale(1.01)'
            }
          }}
          onClick={() => {
            router.push(`/groups/${group._id}`);
          }}
        >
          <CardHeader
            avatar={
              <>
                <Avatar aria-label="recipe" src={group.groupAvatar} alt={group.groupAvatar} />
              </>
            }
            title={group.groupName}
            subheader={group.description}
            action={
              <Button sx={{ height: 20, fontWeight: 200 }} aria-label="settings" variant="text">
                <InfoOutlined />
              </Button>
            }
          />
        </Card>
      ))}
    </>
  );
}
