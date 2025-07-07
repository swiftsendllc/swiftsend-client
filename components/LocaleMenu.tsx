import { LangCode, languageOptions } from '@/locales/dictionary';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, IconButton, List, ListItem, ListItemButton, ListItemText, Menu } from '@mui/material';
import { useState } from 'react';

interface LocaleProps {
  locale: LangCode;
  setLocale: (newLocale: LangCode) => unknown;
}

export function LocaleMenu({ locale, setLocale }: LocaleProps) {
  const [open, setOpen] = useState<boolean>(false);
  const changeLanguage = (lang: LangCode) => {
    setLocale(lang);
    setOpen(false);
  };

  return (
    <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(255,255, 255, 0.1)',
          color: 'white',
          borderRadius: 3,
          px: 2
        }}
      >
        {locale}
        <KeyboardArrowDownIcon />
      </IconButton>
      <Menu
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          {languageOptions.map((option, idx) => (
            <ListItem key={idx} disablePadding>
              <ListItemButton onClick={() => changeLanguage(option.languageCode)}>
                <ListItemText primary={option.language} sx={{ textAlign: 'center' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Menu>
    </Box>
  );
}
