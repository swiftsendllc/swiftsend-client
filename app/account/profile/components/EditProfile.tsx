"use client";

import UseAPI from "@/hooks/useAPI";
import { UserContext } from "@/hooks/useContext";
import {
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

import { UpdateUserInput } from "@/hooks/types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import {
  Avatar,
  Badge,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useContext, useRef, useState } from "react";
import EditUsernameModal from "./EditProfileModal";

export default function EditProfilePage() {
  const [user] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { uploadFile } = UseAPI();
  const inputRef = useRef<HTMLInputElement>(null);
  const [editUsernameModal, setEditUsernameModal] = useState(false);
  const [formData] = useState<Partial<UpdateUserInput>>({});
  const [currentField, setCurrentField] = useState<string>("");
  console.log({ user, d: user });

  const profiles = [
    {
      label: "Name",
      key: "fullName",
      value: user.fullName ,
      disabled: true,
    },
    {
      label: "Username",
      key: "username",
      value: user.username,
      rightIcon: <KeyboardArrowRightOutlinedIcon />,
    },
    {
      label: "Pronouns",
      key: "pronouns",
      value: user.pronouns,
      rightIcon: <KeyboardArrowRightOutlinedIcon />,
    },
    {
      label: "Bio",
      key: "bio",
      value: user.bio,
      rightIcon: <KeyboardArrowRightOutlinedIcon />,
    },
    {
      label: "Links",
      key: "links",
      value: user.websiteURL,
      rightIcon: <KeyboardArrowRightOutlinedIcon />,
    },
    {
      label: "Banners",
      key: "banners",
      value: user.bannerURL,
      rightIcon: <KeyboardArrowRightOutlinedIcon />,
    },
    {
      label: "Gender",
      key: "gender",
      value: user.gender,
      disabled: true,
    },
  ];

  const profileInformation = [
    {
      label: "Page",
      rightIcon: <KeyboardArrowRightOutlinedIcon />,
      text: "Connect or create",
      default: true,
    },
    {
      label: "Category",
      rightIcon: <KeyboardArrowRightOutlinedIcon />,
      text: "Photographer",
      default: true,
    },
    {
      label: "Contact options",
      rightIcon: <KeyboardArrowRightOutlinedIcon />,
      text: "Address",
      default: true,
    },
    {
      label: "Action buttons",
      rightIcon: <KeyboardArrowRightOutlinedIcon />,
      text: "None active",
      default: true,
    },
    {
      label: "Profile display",
      rightIcon: <KeyboardArrowRightOutlinedIcon />,
      text: "Category hidden",
      default: true,
    },
  ];

  const handleUpload = async (file: File) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      await uploadFile(formData);
    } finally {
      setLoading(false);
    }
  };

  console.log({ formData, profiles });

  return (
    <>
      <Stack
        spacing={2}
        direction="row"
        alignContent="center"
        alignItems="center"
        mb={2}
      >
        <IconButton href="/account" LinkComponent={Link}>
          <ArrowBackIcon />
        </IconButton>
        <Typography alignContent="center" alignItems="center" variant="h6">
          Edit Profile
        </Typography>
      </Stack>
      <Divider />
      <Stack alignContent="center" alignItems="center">
        <IconButton
          onClick={() => inputRef.current?.click()}
          disabled={loading}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              loading ? <CircularProgress size={20} /> : <CameraAltIcon />
            }
          >
            <Avatar
              src={user.avatarURL!}
              sx={{ width: 60, height: 60 }}
              alt="Henry Cavil"
            />
          </Badge>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (!e.target.files?.length) return;
              handleUpload(e.target.files[0]);
            }}
            hidden
          />
        </IconButton>
      </Stack>
      <Divider />

      <Stack spacing={2} mb={4}>
        {profiles.map((option, idx) => (
          <TextField
            key={idx}
            variant="standard"
            label={option.label || ""}
            multiline={option.label === "Bio"}
            value={option.value}
            onClick={() => {
              setCurrentField(option.label);
              setEditUsernameModal(true);
            }}
            slotProps={{
              input: {
                endAdornment: option.rightIcon && (
                  <InputAdornment position="end">
                    {option.rightIcon}
                  </InputAdornment>
                ),
              },
            }}
            disabled={option.disabled}
          />
        ))}
      </Stack>

      <Typography mt={2} variant="h6">
        Profile Information
      </Typography>
      <List sx={{ width: " 100%" }}>
        {profileInformation.map((option, idx) => (
          <ListItemButton key={idx} sx={{ p: 0 }}>
            <ListItemText disableTypography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignContent="center"
                alignItems="center"
              >
                <Typography variant="body1">{option.label}</Typography>
                <Stack
                  direction="row"
                  alignContent="center"
                  alignItems="center"
                >
                  <Typography variant="body2" color="text.secondary">
                    {option.text}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.rightIcon}
                  </Typography>
                </Stack>
              </Stack>
            </ListItemText>
          </ListItemButton>
        ))}
      </List>
      <Stack spacing={2} direction="column" mb={8}>
        <Divider />
        <Typography style={{ color: "var(--success)" }}>
          Personal information settings
        </Typography>
        <Divider />
        <Typography style={{ color: "var(--success)" }}>
          Show that your profile is verified
        </Typography>
      </Stack>
      <EditUsernameModal
        isOpen={editUsernameModal}
        onClose={() => setEditUsernameModal(false)}
        currentField={currentField}
      />
    </>
  );
}
