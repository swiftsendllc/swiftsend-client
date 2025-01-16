"use client";
import { LangCode, useTranslation,  } from "@/locales/dictionary";
import InstagramIcon from "@mui/icons-material/Instagram";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { GoogleIconCustom } from "./CustomIcons";

export default function LandingPage() {
  const [open, setOpen] = useState(false);
  const { t, locale, setLocale } = useTranslation();
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const languageOptions = [
    {
      language: "English",
      languageCode: "en",
    },
    {
      language: "French",
      languageCode: "fr",
    },
    {
      language: "German",
      languageCode: "de",
    },
  ] as { language: string; languageCode: LangCode }[];

  const changeLanguage = (lang: LangCode) => {
    setLocale(lang);
    setOpen(false);
  };
  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          justifyContent: "flex-end",
          width: "auto",
        }}
        role="presentation"
      >
        <IconButton
          sx={{ borderRadius: "30px", fontSize: ".85rem" }}
          onClick={toggleDrawer(true)}
          aria-label="Select-Language"
        >
          {locale}
          <KeyboardArrowDownIcon />
        </IconButton>
        <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
          <List>
            {languageOptions.map((option, idx) => (
              <ListItem key={idx} disablePadding>
                <ListItemButton onClick={() => changeLanguage(option.languageCode)}>
                  <ListItemText
                    primary={option.language}
                    sx={{ textAlign: "center" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
      <Box width="100%" textAlign="center" alignContent="center" mb={20}>
        <InstagramIcon sx={{ height: 140, width: 140 }} />
        <Typography variant="h3" fontWeight={300}>
          {t("appName")}
        </Typography>
      </Box>

      <Stack spacing={3} mb={2}>
        <Button fullWidth variant="contained" color="success" href="/signup">
          {t("signUp")}
        </Button>

        <Button fullWidth variant="outlined" href="/login">
          {t("login")}
        </Button>
        <Button
          fullWidth
          variant="contained"
          startIcon={<GoogleIconCustom />}
          href="/account"
        >
          {t("googleSign")}
        </Button>
      </Stack>
      <Typography variant="body2" align="center" color="text.secondary">
        {t("privacyPolicy")}
      </Typography>
    </Container>
  );
}
