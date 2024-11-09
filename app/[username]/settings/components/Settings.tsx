"use client";

import {
  forProfessionals,
  howOthersCanInteractWithYou,
  howToUseInstagram,
  moreInfoAndSupport,
  payments,
  whatYouSee,
  whoCanSeeYourContent,
  yourAppAndMedia,
} from "@/components/SearchComponents";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

import { UserContext } from "@/hooks/context/user-context";
import { authCookieKey } from "@/library/constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  Autocomplete,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

const minWidth = 35;

export default function SettingsPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [user] = useContext(UserContext);

  const yourAccounts = [
    {
      label: "Accounts",
      leftIcon: (
        <Image
          width={30}
          height={30}
          src={user.avatarURL!}
          alt="avatar"
          style={{ width: 30, height: 30, borderRadius: "50%" }}
        />
      ),
      rightIcon: <KeyboardArrowRightOutlinedIcon />,
      text: "Passwords, security, personal details, ad preferences",
    },
  ];
  const settingsPage = [
    ...yourAccounts,
    ...howToUseInstagram,
    ...forProfessionals,
    ...whoCanSeeYourContent,
    ...howOthersCanInteractWithYou,
    ...whatYouSee,
    ...yourAppAndMedia,
    ...payments,
    ...moreInfoAndSupport,
  ];

  const handleLogout = () => {
    deleteCookie(authCookieKey);
    router.push("/");
    toast.success("Logged out ");
  };
  return (
    <>
      <Stack mt={1} mb={3}>
        <Stack
          spacing={1}
          direction="row"
          alignContent="center"
          alignItems="center"
          mb={2}
        >
          <IconButton href={`/${user.username}`} LinkComponent={Link}>
            <ArrowBackIcon />
          </IconButton>
          <Typography alignContent="center" alignItems="center" variant="h6">
            Settings and privacy
          </Typography>
        </Stack>

        <Autocomplete
          freeSolo
          onInputChange={(_, value) => {
            setQuery(value);
          }}
          open={Boolean(query)}
          disablePortal
          options={settingsPage}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField
              {...params}
              slotProps={{ input: { sx: { borderRadius: "30px" } } }}
              label="Search"
            />
          )}
        />
      </Stack>
      <Divider />
      <Typography fontWeight={400} variant="h6" color="text.secondary" mt={2}>
        Your accounts{" "}
      </Typography>
      <List sx={{ width: "100%", mb: 1, padding: 0 }}>
        {yourAccounts.map((option, idx) => (
          <ListItemButton key={idx} sx={{ padding: 0, py: 1, borderRadius: 2 }}>
            <ListItemIcon sx={{ pr: 1, minWidth }}>
              {option.leftIcon}
            </ListItemIcon>
            {option.leftIcon ? (
              <ListItemText disableTypography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignContent="center"
                  alignItems="center"
                >
                  <Stack
                    direction="column"
                    alignContent="center"
                    alignItems="left"
                  >
                    <Typography variant="body1">{option.label}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {option.text}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {option.rightIcon}
                  </Typography>
                </Stack>
              </ListItemText>
            ) : (
              <ListItemText primary={option.label} />
            )}
          </ListItemButton>
        ))}
        <Typography variant="body2" color="text.secondary">
          Manage your connected experiences and account settings across Meta
          technologies.
          <Link color="primary" href="#">
            Learn more
          </Link>
        </Typography>
      </List>
      <Divider />
      <Typography fontWeight={400} variant="h6" color="text.secondary">
        How to use instagram
      </Typography>
      <List sx={{ width: "100%", mb: 1, padding: 0 }}>
        {howToUseInstagram.map((option, idx) => (
          <ListItemButton
            key={idx}
            sx={{ padding: 0, py: 1, borderRadius: 2 }}
            href={option.route}
            LinkComponent={Link}
          >
            <ListItemIcon sx={{ pr: 1, minWidth }}>
              {option.leftIcon}
            </ListItemIcon>

            {option.leftIcon ? (
              <ListItemText disableTypography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignContent="center"
                  alignItems="center"
                >
                  <Typography variant="body1">{option.label}</Typography>

                  <Typography variant="body2" color="text.secondary">
                    {option.text}
                    {option.rightIcon}
                  </Typography>
                </Stack>
              </ListItemText>
            ) : (
              <ListItemText primary={option.label} />
            )}
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <Typography fontWeight={400} variant="h6" color="text.secondary">
        For professionals
      </Typography>
      <List sx={{ width: "100%", mb: 1, padding: 0 }}>
        {forProfessionals.map((option, idx) => (
          <ListItemButton key={idx} sx={{ padding: 0, py: 1, borderRadius: 2 }}>
            <ListItemIcon sx={{ pr: 1, minWidth }}>
              {option.leftIcon}
            </ListItemIcon>
            {option.leftIcon ? (
              <ListItemText disableTypography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignContent="center"
                  alignItems="center"
                >
                  <Typography variant="body1">{option.label}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.text}
                    {option.rightIcon}
                  </Typography>
                </Stack>
              </ListItemText>
            ) : (
              <ListItemText primary={option.label} />
            )}
          </ListItemButton>
        ))}
      </List>
      <Divider />{" "}
      <Typography fontWeight={400} variant="h6" color="text.secondary">
        Who can see your content
      </Typography>
      <List sx={{ width: "100%", mb: 1, padding: 0 }}>
        {whoCanSeeYourContent.map((option, idx) => (
          <ListItemButton key={idx} sx={{ padding: 0, py: 1, borderRadius: 2 }}>
            <ListItemIcon sx={{ pr: 1, minWidth }}>
              {option.leftIcon}
            </ListItemIcon>
            {option.leftIcon ? (
              <ListItemText disableTypography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignContent="center"
                  alignItems="center"
                >
                  <Typography variant="body1">{option.label}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.text}
                    {option.rightIcon}
                  </Typography>
                </Stack>
              </ListItemText>
            ) : (
              <ListItemText primary={option.label} />
            )}
          </ListItemButton>
        ))}
      </List>
      <Divider />{" "}
      <Typography fontWeight={400} variant="h6" color="text.secondary">
        How others can interact with you
      </Typography>
      <List sx={{ width: "100%", mb: 1, padding: 0 }}>
        {howOthersCanInteractWithYou.map((option, idx) => (
          <ListItemButton key={idx} sx={{ padding: 0, py: 1, borderRadius: 2 }}>
            <ListItemIcon sx={{ pr: 1, minWidth }}>
              {option.leftIcon}
            </ListItemIcon>
            {option.leftIcon ? (
              <ListItemText disableTypography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignContent="center"
                  alignItems="center"
                >
                  <Typography variant="body1">{option.label}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.text}
                    {option.rightIcon}
                  </Typography>
                </Stack>
              </ListItemText>
            ) : (
              <ListItemText primary={option.label} />
            )}
          </ListItemButton>
        ))}
      </List>
      <Divider />{" "}
      <Typography fontWeight={400} variant="h6" color="text.secondary">
        What you see
      </Typography>
      <List sx={{ width: "100%", mb: 1, padding: 0 }}>
        {whatYouSee.map((option, idx) => (
          <ListItemButton key={idx} sx={{ padding: 0, py: 1, borderRadius: 2 }}>
            <ListItemIcon sx={{ pr: 1, minWidth }}>
              {option.leftIcon}
            </ListItemIcon>
            {option.leftIcon ? (
              <ListItemText disableTypography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignContent="center"
                  alignItems="center"
                >
                  <Typography variant="body1">{option.label}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.text}
                    {option.rightIcon}
                  </Typography>
                </Stack>
              </ListItemText>
            ) : (
              <ListItemText primary={option.label} />
            )}
          </ListItemButton>
        ))}
      </List>
      <Divider />{" "}
      <Typography fontWeight={400} variant="h6" color="text.secondary">
        Your app and media
      </Typography>
      <List sx={{ width: "100%", mb: 1, padding: 0 }}>
        {yourAppAndMedia.map((option, idx) => (
          <ListItemButton key={idx} sx={{ padding: 0, py: 1, borderRadius: 2 }}>
            <ListItemIcon sx={{ pr: 1, minWidth }}>
              {option.leftIcon}
            </ListItemIcon>
            {option.leftIcon ? (
              <ListItemText disableTypography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignContent="center"
                  alignItems="center"
                >
                  <Typography variant="body1">{option.label}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.text}
                    {option.rightIcon}
                  </Typography>
                </Stack>
              </ListItemText>
            ) : (
              <ListItemText primary={option.label} />
            )}
          </ListItemButton>
        ))}
      </List>
      <Divider />{" "}
      <Typography fontWeight={400} variant="h6" color="text.secondary">
        Payments
      </Typography>
      <List sx={{ width: "100%", mb: 1, padding: 0 }}>
        {payments.map((option, idx) => (
          <ListItemButton key={idx} sx={{ padding: 0, py: 1, borderRadius: 2 }}>
            <ListItemIcon sx={{ pr: 1, minWidth }}>
              {option.leftIcon}
            </ListItemIcon>
            {option.leftIcon ? (
              <ListItemText disableTypography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignContent="center"
                  alignItems="center"
                >
                  <Typography variant="body1">{option.label}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.text}
                    {option.rightIcon}
                  </Typography>
                </Stack>
              </ListItemText>
            ) : (
              <ListItemText primary={option.label} />
            )}
          </ListItemButton>
        ))}
      </List>
      <Divider />{" "}
      <Typography fontWeight={400} variant="h6" color="text.secondary">
        More info and support
      </Typography>
      <List sx={{ width: "100%", mb: 1, padding: 0 }}>
        {moreInfoAndSupport.map((option, idx) => (
          <ListItemButton key={idx} sx={{ padding: 0, py: 1, borderRadius: 2 }}>
            <ListItemIcon sx={{ pr: 1, minWidth }}>
              {option.leftIcon}
            </ListItemIcon>
            {option.leftIcon ? (
              <ListItemText disableTypography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignContent="center"
                  alignItems="center"
                >
                  <Typography variant="body1">{option.label}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.text}
                    {option.rightIcon}
                  </Typography>
                </Stack>
              </ListItemText>
            ) : (
              <ListItemText primary={option.label} />
            )}
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <List sx={{ width: "100%", mt: 1, mb: 2 }}>
        <ListItemButton
          sx={{ padding: 0, py: 1, borderRadius: 2 }}
          onClick={handleLogout}
        >
          <ListItemIcon sx={{ pr: 1, minWidth }}>
            <LogoutIcon sx={{ width: 30, height: 30 }} color="error" />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ color: "error" }}
          />
        </ListItemButton>
      </List>
      <Stack width="100%">
        <Typography variant="body1" color="text.secondary" textAlign="center">
          {" "}
          Made with ❤️ in India
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          {" "}
          © {new Date().getFullYear()} All rights reserved
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mt={1}
          mb={6}
        >
          v1.0.0
        </Typography>
      </Stack>
    </>
  );
}
