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
