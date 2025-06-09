import { Container } from "@mui/material";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
