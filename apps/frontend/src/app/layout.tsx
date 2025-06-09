import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryContext } from "@/core/hooks/contexts/ReactQueryContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@/core/hooks/contexts/ThemeContext";
import { cookies } from "next/headers";
import { ThemeCookiesEnum, ThemeModeEnum } from "@/core/common/enums/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mouts TI",
  description: "Teste de ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  const themeMode =
    cookieStore.get(ThemeCookiesEnum.Mode)?.value === ThemeModeEnum.Dark
      ? ThemeModeEnum.Dark
      : ThemeModeEnum.Light;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <ReactQueryContext>
            <ThemeProvider {...{ themeMode }}>{children}</ThemeProvider>
          </ReactQueryContext>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
