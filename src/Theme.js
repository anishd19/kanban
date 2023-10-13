import React from "react";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { blueGrey, indigo, grey } from "@mui/material/colors";
import { GlobalStyles, css } from "@mui/material";

const globalCSS = css`
  * {
    box-sizing: border-box;
  }
  #root {
    height: 100%;
  }
  html {
    height: 100%;
  }
  body {
    height: 100vh;
    margin: 0;
    padding: 0;
    background: ${indigo[700]};
  }
`;

export const theme = responsiveFontSizes(
  createTheme({
    spacing: [0, 4, 8, 12, 16, 32, 64],
    palette: {
      secondary: {
        main: blueGrey[500],
        light: blueGrey[200],
        lighter: blueGrey[100],
        dark: blueGrey[700],
        darker: blueGrey[900],
        contrastText: "#fff",
      },
      primary: {
        main: indigo[500],
        light: indigo[200],
        lighter: indigo[100],
        dark: indigo[700],
        darker: indigo[900],
        contrastText: "#fff",
      },
      grey: {
        main: grey[500],
        light: grey[200],
        lighter: grey[100],
        dark: grey[700],
        darker: grey[900],
        contrastText: "#000",
      }
    },
    typography: {
      color: "#fff",
    },
  })
);

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={globalCSS} />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
