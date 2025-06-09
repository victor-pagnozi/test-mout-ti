"use client";

import { Container } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="pt-br">
      <Container
        sx={{
          minHeight: "100vh",
          maxWidth: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url(/images/auth/background.jpg)",
          backgroundSize: "cover",
        }}
      >
        {children}
      </Container>
    </LocalizationProvider>
  );
}
