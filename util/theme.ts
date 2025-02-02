"use client";

import { createTheme } from "@mui/material/styles";
import { Kanit } from "next/font/google";

const kanit = Kanit({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: kanit.style.fontFamily,
    allVariants: { color: "#fff" },
  },
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          height: 45,
        },
        size: "large",
      },
    },
  },
});

export default theme;

// "use client";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// import { getCookie, setCookie } from "cookies-next";
// import { Kanit } from "next/font/google";
// import { createContext, useEffect, useState } from "react";

// const kanit = Kanit({
//   weight: ["300", "400", "500", "700"],
//   subsets: ["latin"],
//   display: "swap",
// });

// export type ThemeMode = "dark" | "light";


// const emptyTheme: ThemeMode = "light";

// export const ThemeContext = createContext<{
//   themeColor: ThemeMode;
//   toggleTheme: () => void;
// }>({
//   themeColor: emptyTheme,
//   toggleTheme: () => {},
// });

// const getTheme = (mode: ThemeMode) => {
//   return createTheme({
//     direction: "rtl",
//     palette: {
//       mode,
//       background: {
//         default: mode === "dark" ? "#121212" : "#fff",
//         paper: mode === "dark" ? "#1E1E1E" : "#f5f5f5",
//       },
//       text: {
//         primary: mode === "dark" ? "#fff" : "#000",
//       },
//     },
//     typography: {
//       fontFamily: kanit.style.fontFamily,
//       allVariants: { color: mode === "dark" ? "#fff" : "#000" },
//     },
//     components: {
//       MuiButton: {
//         defaultProps: {
//           sx: {
//             height: 45,
//           },
//           size: "large",
//         },
//       },
//     },
//   });
// };

// export const ThemeContextWrapper = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const storedTheme = ((getCookie("theme") as string) || "light") as ThemeMode;
//   const [themeMode, setThemeMode] = useState<ThemeMode>(
//     storedTheme as ThemeMode
//   );

//   useEffect(() => setCookie("theme", themeMode), [themeMode]);

//   const toggleTheme = () => {
//     setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
//   };

//   const theme = getTheme(themeMode);

//   return (

//   );
// };
