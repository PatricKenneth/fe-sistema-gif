import { createTheme } from "@mui/material/styles";

export interface CustomTheme {
  my: {
    primary: {
      main: string;
      light: string;
    };
  };
}

const theme = createTheme({
  my: {
    primary: {
      main: "#6200EE",
      light: "#FFFFFF",
    },
  }
});

export default theme;
