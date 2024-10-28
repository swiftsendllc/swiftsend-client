"use client";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import GridOnSharpIcon from "@mui/icons-material/GridOnSharp";
import HandshakeIcon from "@mui/icons-material/Handshake";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import HideSourceOutlinedIcon from "@mui/icons-material/HideSourceOutlined";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import InsertCommentRoundedIcon from "@mui/icons-material/InsertCommentRounded";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import MovieSharpIcon from "@mui/icons-material/MovieSharp";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PersonPinRoundedIcon from "@mui/icons-material/PersonPinRounded";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const yourAccounts = [
  {
    label: "Accounts",
    leftIcon: <AccountCircleIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
    text: "Passwords, security, personal details, ad preferences",
  },
];

export const howToUseInstagram = [
  {
    label: "Saved",
    leftIcon: <BookmarkBorderOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    label: "Archive",
    leftIcon: <RestoreOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    label: "Your Activity",
    leftIcon: <BrokenImageOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    label: "Notifications",
    leftIcon: <NotificationsNoneOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
    text: "",
  },
];
export const forProfessionals = [
  {
    label: "Insights",
    leftIcon: <EqualizerOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },

  {
    label: "Creator tools and controls",
    leftIcon: <InsertChartOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    label: "Iota verified",
    text: "",
    leftIcon: <VerifiedOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
];
export const whoCanSeeYourContent = [
  {
    label: "Account Privacy",
    leftIcon: <LockOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },

  {
    label: "Blocked",
    leftIcon: <BlockOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    label: "Hide story and live",
    text: "",
    leftIcon: <HideSourceOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
];
export const howOthersCanInteractWithYou = [
  {
    label: "Message replies ",
    leftIcon: <MailOutlineOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    label: "Tags and mentions",
    leftIcon: <TagOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    label: "Comments",
    leftIcon: <InsertCommentRoundedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
    text: "",
  },
];
export const whatYouSee = [
  {
    text: "",
    label: "Favorites ",
    leftIcon: <StarBorderOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },

  {
    label: "Like and share counts ",
    leftIcon: <HideSourceOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
];
export const yourAppAndMedia = [
  {
    text: "",
    label: "Device permissions ",
    leftIcon: <PhoneAndroidOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    label: "Language ",
    leftIcon: <TranslateOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
];

export const payments = [
  {
    label: " Payments ",
    text: "",
    leftIcon: <PaymentOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
];
export const moreInfoAndSupport = [
  {
    label: "Privacy centre ",
    leftIcon: <HealthAndSafetyOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    label: "Account status ",
    leftIcon: <PersonOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    label: "About ",
    leftIcon: <InfoOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
    text: "",
  },
];


export const countries = [
  { label: "Argentina" },
  { label: "Brazil" },
  { label: "China" },
  { label: "Egypt" },
  { label: "France" },
  { label: "Germany" },
  { label: "India" },
  { label: "Indonesia" },
  { label: "Iran" },
  { label: "Italy" },
  { label: "Japan" },
  { label: "Mexico" },
  { label: "Nigeria" },
  { label: "Pakistan" },
  { label: "Russia" },
  { label: "Saudi Arabia" },
  { label: "South Africa" },
  { label: "South Korea" },
  { label: "Spain" },
];
export const previewGrid = [
  {
    label: "Tag people",
    leftIcon: <PersonPinRoundedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: (
      <KeyboardArrowRightOutlinedIcon sx={{ width: 30, height: 30 }} />
    ),
  },
  {
    label: "Partnership label and ads",
    leftIcon: <HandshakeIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: (
      <KeyboardArrowRightOutlinedIcon sx={{ width: 30, height: 30 }} />
    ),
  },
  {
    label: "Audience",
    leftIcon: <VisibilityIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: (
      <KeyboardArrowRightOutlinedIcon sx={{ width: 30, height: 30 }} />
    ),
  },
  {
    label: "Add location",
    leftIcon: <FmdGoodOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: (
      <KeyboardArrowRightOutlinedIcon sx={{ width: 30, height: 30 }} />
    ),
  },

  {
    label: "Boost entry",
    leftIcon: <TrendingUpOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: (
      <KeyboardArrowRightOutlinedIcon sx={{ width: 30, height: 30 }} />
    ),
  },
];
export const profileInformation = [
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

export const create = [
  {
    label: "Entry",
    icon: <GridOnSharpIcon sx={{ width: 30, height: 30 }} />,
  },
  {
    label: "Intro",
    icon: <MovieSharpIcon sx={{ width: 30, height: 30 }} />,
  },
  {
    label: "Status",
    icon: <HistoryToggleOffIcon sx={{ width: 30, height: 30 }} />,
  },

  {
    label: "Subscribe",
    icon: <ShoppingBasketIcon sx={{ width: 30, height: 30 }} />,
  },
];
export const postSamples = [
  {
    imageURL: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    imageURL: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    imageURL: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    imageURL: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    imageURL: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    imageURL: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    imageURL: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    imageURL: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    imageURL: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    imageURL: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    imageURL: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    imageURL: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];


