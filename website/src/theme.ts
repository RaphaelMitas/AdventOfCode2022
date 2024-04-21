"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#70d4eb",
      main: "#4DCAE6",
      dark: "#358da1",
      contrastText: "#000000",
    },
  },

  shape: {
    borderRadius: 8,
  },
});

export default theme;
