import { Menu, MenuItem } from '@mui/material';
interface MessageThreadHeaderMenuProps {
  anchorEl: HTMLElement | null;
  handleClose: () => unknown;
}

export function MessageThreadHeaderMenuOptions({
  anchorEl,
  handleClose,
}: MessageThreadHeaderMenuProps) {
  return (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
    >
      <MenuItem
        onClick={() => {
          handleClose();
        }}
      >
        Select Multiple
      </MenuItem>
      <MenuItem onClick={handleClose}>Send Exclusive</MenuItem>
      <MenuItem onClick={handleClose}>Report</MenuItem>
    </Menu>
  );
}
