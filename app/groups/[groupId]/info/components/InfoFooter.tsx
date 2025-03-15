import { GroupsEntity } from '@/hooks/entities/messages.entities';
import { DeleteForeverTwoTone, LogoutOutlined } from '@mui/icons-material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import moment from 'moment';

export function InfoFooter({ group, onDelete }: { group: GroupsEntity; onDelete?: () => unknown }) {
  return (
    <>
      <Box display="flex" justifyContent="space-between" padding={1}>
        <Stack direction="row" justifyContent="space-around" alignContent="center" alignItems="center">
          <IconButton color="error">
            <LogoutOutlined />
          </IconButton>
          <Typography color="error">Leave group</Typography>
        </Stack>
        <Typography>
          <KeyboardArrowRightIcon />
        </Typography>
      </Box>
      <Divider />
      {group.isAdmin && (
        <Box padding={1}>
          <Button color="error" onClick={onDelete}>
            <DeleteForeverTwoTone />
            Delete group
          </Button>
        </Box>
      )}
      <Box>
        <Divider />
        <Typography color="info"> Created at {moment(group.createdAt).format('LT L')}</Typography>
        <Typography color="info"> Created by {group._admin.fullName}</Typography>
      </Box>
    </>
  );
}
