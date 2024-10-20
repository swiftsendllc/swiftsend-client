"use client";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
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
import ShoppingBasketSharpIcon from "@mui/icons-material/ShoppingBasketSharp";
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
    label: "Archiving and downloading ",
    leftIcon: <GetAppOutlinedIcon sx={{ width: 30, height: 30 }} />,
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

export const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];
