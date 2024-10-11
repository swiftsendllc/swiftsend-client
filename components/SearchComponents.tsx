"use client";

import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import AutoModeOutlinedIcon from "@mui/icons-material/AutoModeOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import DomainAddOutlinedIcon from "@mui/icons-material/DomainAddOutlined";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import GridOnSharpIcon from "@mui/icons-material/GridOnSharp";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import HideSourceOutlinedIcon from "@mui/icons-material/HideSourceOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import InsertCommentRoundedIcon from "@mui/icons-material/InsertCommentRounded";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import MovieSharpIcon from "@mui/icons-material/MovieSharp";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NotificationsOffOutlinedIcon from "@mui/icons-material/NotificationsOffOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PersonPinRoundedIcon from "@mui/icons-material/PersonPinRounded";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import PhonelinkOutlinedIcon from "@mui/icons-material/PhonelinkOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import ShoppingBasketSharpIcon from "@mui/icons-material/ShoppingBasketSharp";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import SupportOutlinedIcon from "@mui/icons-material/SupportOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

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
  },
  {
    label: "Time management",
    text: "",
    leftIcon: <AccessTimeOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
];
export const forProfessionals = [
  {
    label: "Insights",
    leftIcon: <EqualizerOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    label: "Scheduled content",
    leftIcon: <ScheduleOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    label: "Creator tools and controls",
    leftIcon: <InsertChartOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    label: "Meta verified",
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
    label: "Close friends",
    leftIcon: <AutoModeOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    label: "Crossposting ",
    leftIcon: <DomainAddOutlinedIcon sx={{ width: 30, height: 30 }} />,
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
    label: "Messages and story replies ",
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
  },
  {
    label: "Sharing and remixes",
    leftIcon: <ShareRoundedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    label: "Restricted ",
    leftIcon: <PersonOffOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    label: "Limit interactions ",
    leftIcon: <FeedbackOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    label: "Hidden words",
    leftIcon: <VisibilityOffOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    text: "",
    label: "Follow and invite friends",
    leftIcon: <PersonAddAlt1OutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
];
export const whatYouSee = [
  {
    text: "",
    label: "Favourites ",
    leftIcon: <StarBorderOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    label: "Muted accounts ",
    leftIcon: <NotificationsOffOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    label: "Suggested content ",
    leftIcon: <AddToPhotosOutlinedIcon sx={{ width: 30, height: 30 }} />,
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
    label: "Archiving and downloading ",
    leftIcon: <GetAppOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },

  {
    label: "Accessibility and translations ",
    leftIcon: <AccessibilityNewOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    label: "Language ",
    leftIcon: <TranslateOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    label: "Media quality ",
    leftIcon: <SignalCellularAltOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    label: "Website permissions ",
    leftIcon: <PhonelinkOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
];
export const forFamilies = [
  {
    label: "Family centre ",
    text: "",
    leftIcon: <GroupOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
];
export const yourOrdersAndFundraisers = [
  {
    label: "Orders and payments ",
    text: "",
    leftIcon: <PaymentOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
];
export const moreInfoAndSupport = [
  {
    label: "Help ",
    text: "",
    leftIcon: <SupportOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: <KeyboardArrowRightOutlinedIcon />,
  },
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
  },
];

export const stats = [
  {
    title: "posts",
    count: 1,
    label: "/followers",
  },
  {
    title: "followers",
    count: 1,
    label: "/followers",
  },
  {
    title: "following",
    count: 1,
    label: "/following",
  },
];

export const grid = [
  {
    value: "/account",
    icon: <GridOnSharpIcon color="inherit" />,
  },
  {
    value: "/account/subscribers",
    icon: <ShoppingBasketSharpIcon />,
  },
  {
    value: "/account/reels",
    icon: <MovieSharpIcon />,
  },
  {
    value: "/account/tags",
    icon: <PersonPinRoundedIcon />,
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
