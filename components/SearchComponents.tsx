"use client";

import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import AutoModeOutlinedIcon from "@mui/icons-material/AutoModeOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DomainAddOutlinedIcon from "@mui/icons-material/DomainAddOutlined";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import UpdateIcon from "@mui/icons-material/Update";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import GridOnSharpIcon from "@mui/icons-material/GridOnSharp";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import HandshakeIcon from "@mui/icons-material/Handshake";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import HideSourceOutlinedIcon from "@mui/icons-material/HideSourceOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import InsertCommentRoundedIcon from "@mui/icons-material/InsertCommentRounded";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import MovieSharpIcon from "@mui/icons-material/MovieSharp";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NotificationsOffOutlinedIcon from "@mui/icons-material/NotificationsOffOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PersonPinRoundedIcon from "@mui/icons-material/PersonPinRounded";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import PhonelinkOutlinedIcon from "@mui/icons-material/PhonelinkOutlined";
import PhotoFilterOutlinedIcon from "@mui/icons-material/PhotoFilterOutlined";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import ShoppingBasketSharpIcon from "@mui/icons-material/ShoppingBasketSharp";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import SupportOutlinedIcon from "@mui/icons-material/SupportOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
export const previewGrid = [
  {
    label: "Tag people",
    leftIcon: <PersonPinRoundedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: (
      <KeyboardArrowRightOutlinedIcon sx={{ width: 30, height: 30 }} />
    ),
  },
  {
    label: "Add music",
    leftIcon: <MusicNoteIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: (
      <KeyboardArrowRightOutlinedIcon sx={{ width: 30, height: 30 }} />
    ),
  },
  {
    label: "Add product details",
    leftIcon: <ProductionQuantityLimitsIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: (
      <KeyboardArrowRightOutlinedIcon sx={{ width: 30, height: 30 }} />
    ),
  },
  {
    label: "Add reminder",
    leftIcon: <CalendarMonthIcon sx={{ width: 30, height: 30 }} />,
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
    label: "Add AI label",
    leftIcon: <PhotoFilterOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: (
      <KeyboardArrowRightOutlinedIcon sx={{ width: 30, height: 30 }} />
    ),
    text: "We require you to label certain realistic content that's made with AI.Learn more",
  },
  {
    label: "Boost post",
    leftIcon: <TrendingUpOutlinedIcon sx={{ width: 30, height: 30 }} />,
    rightIcon: (
      <KeyboardArrowRightOutlinedIcon sx={{ width: 30, height: 30 }} />
    ),
  },
];
export  const profileInformation = [
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
    label: "Post",
    icon: <GridOnSharpIcon sx={{ width: 30, height: 30 }} />,
  },
  {
    label: "Reel",
    icon: <MovieSharpIcon sx={{ width: 30, height: 30 }} />,
  },
  {
    label: "Story",
    icon: <HistoryToggleOffIcon sx={{ width: 30, height: 30 }} />,
  },
  {
    label: "Story highlight",
    icon: <UpdateIcon sx={{ width: 30, height: 30 }} />,
  },
  {
    label: "Subscribe",
    icon: <ShoppingBasketIcon sx={{ width: 30, height: 30 }} />,
  },
];
export const postSamples = [
  {
    imageURL: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    imageURL: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    imageURL: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    imageURL: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    imageURL: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    imageURL: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    imageURL: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    imageURL: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    imageURL: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    imageURL: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    imageURL: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    imageURL: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];