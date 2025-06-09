"use client";

import { ThemeCookiesEnum, ThemeModeEnum } from "@/core/common/enums/theme";
import { useThemeContext } from "@/core/hooks/contexts/ThemeContext";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export const ThemeMode = () => {
  const { toggleTheme, mode } = useThemeContext();
  const [themeMode, setThemeMode] = useState<ThemeModeEnum>(
    ThemeModeEnum.Light
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const cookieTheme = Cookies.get(ThemeCookiesEnum.Mode);

    setThemeMode(
      cookieTheme === ThemeModeEnum.Dark
        ? ThemeModeEnum.Dark
        : ThemeModeEnum.Light
    );
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && mode) {
      setThemeMode(mode);
    }
  }, [mode, mounted]);

  if (!mounted) {
    return (
      <Box onClick={toggleTheme}>
        <LightModeOutlined
          sx={{
            fontSize: 32,
            color: "grey.600",
            cursor: "pointer",
            "&:hover": {
              color: "grey.900",
              transform: "scale(1.1)",
              transition: "color 0.3s, transform 0.3s",
            },
          }}
        />
      </Box>
    );
  }

  return (
    <Box onClick={toggleTheme} sx={{ px: 4, pt: 2, position: "absolute" }}>
      {themeMode === ThemeModeEnum.Dark ? (
        <DarkModeOutlined
          sx={{
            fontSize: 32,
            color: "grey.600",
            cursor: "pointer",
            "&:hover": {
              color: "grey.900",
              transform: "scale(1.1)",
              transition: "color 0.3s, transform 0.3s",
            },
          }}
        />
      ) : (
        <LightModeOutlined
          sx={{
            fontSize: 32,
            color: "grey.600",
            cursor: "pointer",
            "&:hover": {
              color: "grey.900",
              transform: "scale(1.1)",
              transition: "color 0.3s, transform 0.3s",
            },
          }}
        />
      )}
    </Box>
  );
};
