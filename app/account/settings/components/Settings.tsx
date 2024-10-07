"use client";

import {
  forFamilies,
  forProfessionals,
  howOthersCanInteractWithYou,
  howToUseInstagram,
  moreInfoAndSupport,
  whatYouSee,
  whoCanSeeYourContent,
  yourAppAndMedia,
  yourOrdersAndFundraisers,
} from "@/components/SearchComponents";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Autocomplete,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const minWidth = 35;

export default function SettingsPage() {
  const [query, setQuery] = useState("");
  const settingsPage = [
    ...howToUseInstagram,
    ...forProfessionals,
    ...whoCanSeeYourContent,
    ...howOthersCanInteractWithYou,
    ...whatYouSee,
    ...yourAppAndMedia,
    ...forFamilies,
    ...yourOrdersAndFundraisers,
    ...moreInfoAndSupport,
  ];

  return (
    <>
      <Stack mt={5} mb={2} alignItems="center">
        <Autocomplete
          onInputChange={(_, value) => {
            setQuery(value);
          }}
          open={Boolean(query)}
          disablePortal
          options={settingsPage}
          sx={{ width: "100%" }}
          renderInput={(params) => <TextField {...params} label="Search" />}
        />
      </Stack>
      <Typography fontWeight={400} variant="h6" color="text.secondary" mt={5}>
        Your accounts{" "}
      </Typography>
      <Stack direction="row" alignItems="center">
        <AccountCircleIcon />
        <Typography>Accounts</Typography>
      </Stack>
      <Divider />
      <Typography fontWeight={400} variant="h6" color="text.secondary">
        How to use instagram
      </Typography>
      <List sx={{ width: "100%", mb: 1, padding: 0 }}>
        {howToUseInstagram.map((option, idx) => (
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
        For families
      </Typography>
      <List sx={{ width: "100%", mb: 1, padding: 0 }}>
        {forFamilies.map((option, idx) => (
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
        Your orders and fundraisers
      </Typography>
      <List sx={{ width: "100%", mb: 1, padding: 0 }}>
        {yourOrdersAndFundraisers.map((option, idx) => (
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
      <Stack width="100%">
        <Typography variant="body1" color="text.secondary" textAlign="center">
          {" "}
          Made with ❤️ in India
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          {" "}
          {new Date().getFullYear()} All rights reserved
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mt={1}
          mb={2}
        >
          v1.0.0
        </Typography>
      </Stack>
    </>
  );
}
