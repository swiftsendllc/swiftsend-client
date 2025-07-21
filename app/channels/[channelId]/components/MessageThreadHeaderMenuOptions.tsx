import { Menu, MenuItem } from '@mui/material';
import React from 'react';
interface MessageThreadHeaderMenuProps {
  anchorEl: HTMLElement | null;
  handleClose: () => unknown;
  setMultipleSelectCheckBox:React.Dispatch<React.SetStateAction<boolean>>
}

export function MessageThreadHeaderMenuOptions({
  anchorEl,
  handleClose,
  setMultipleSelectCheckBox
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
          setMultipleSelectCheckBox(true)
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
