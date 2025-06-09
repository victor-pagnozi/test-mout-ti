"use client";

import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import Cookies from "js-cookie";
import {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { Toast } from "@/core/components/Toast";
import { ThemeCookiesEnum, ThemeModeEnum } from "@/core/common/enums/theme";
import { darkTheme, lightTheme } from "@/core/theme/mui";

interface ThemeContextProps {
  toggleTheme: () => void;
  setTheme: (mode: ThemeModeEnum) => void;
  mode: ThemeModeEnum;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useAuthThemeContext must be used within a AuthThemeProvider"
    );
  }
  return context;
};

export const ThemeProvider = ({
  children,
  themeMode = ThemeModeEnum.Light,
}: {
  children: ReactNode;
  themeMode?: ThemeContextProps["mode"];
}): ReactElement => {
  const [mode, setMode] = useState<ThemeModeEnum>(themeMode);

  function getTheme() {
    return mode === ThemeModeEnum.Dark ? darkTheme : lightTheme;
  }
  const toggleTheme = useCallback(() => {
    Cookies.set(
      ThemeCookiesEnum.Mode,
      mode === ThemeModeEnum.Light ? ThemeModeEnum.Dark : ThemeModeEnum.Light
    );

    setMode(
      mode === ThemeModeEnum.Light ? ThemeModeEnum.Dark : ThemeModeEnum.Light
    );
  }, [mode]);

  const setTheme = (newMode: ThemeModeEnum) => {
    setMode(newMode);
  };

  const contextValue = useMemo(
    () => ({ toggleTheme, setTheme, mode }),
    [toggleTheme, mode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={getTheme()}>
        <CssBaseline />
        <Toast />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
