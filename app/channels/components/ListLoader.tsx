import { List, ListItem, ListItemAvatar, ListItemText, Skeleton } from '@mui/material';

export function ListLoader(value: number) {
  return (
    <>
      <List>
        {Array.from({ length: value }).map((_, idx) => (
          <ListItem key={idx} sx={{ minHeight: 72 }}>
            <ListItemAvatar>
              <Skeleton variant="circular" width={40} height={40} />
            </ListItemAvatar>
            <ListItemText primary={<Skeleton width={'50%'} />} secondary={<Skeleton width={'70%'} />} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
