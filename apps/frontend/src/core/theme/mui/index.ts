import { createTheme } from "@mui/material";
import { ptBR } from "@mui/material/locale";

const lightTheme = createTheme(
  {
    palette: {
      mode: "light",
      primary: {
        main: "#5BA584",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
          },
          contained: {
            color: "#fff",
          },
        },
      },
    },
  },
  ptBR
);

const darkTheme = createTheme(
  {
    palette: {
      mode: "dark",
      primary: {
        main: "#5BA584",
      },
    },
  },
  ptBR
);

export { lightTheme, darkTheme };
