import { Box, Button, TextField } from "@mui/material";
import Image from "next/image";

export const LoginPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: 2,
        width: 600,
        height: 400,
        gap: 2,
        padding: 4,
      }}
    >
      {/* #5BA584 */}
      <Image
        src={"/mouts-logo.png"}
        alt="Logo da Mouts TI"
        width={260}
        height={50}
        style={{
          filter:
            "brightness(0) saturate(100%) invert(42%) sepia(23%) saturate(1847%) hue-rotate(120deg) brightness(95%) contrast(89%)",
        }}
      />

      <TextField label="E-mail" sx={{ width: "100%" }} />
      <TextField type="password" label="Senha" sx={{ width: "100%" }} />

      <Button variant="contained">ENTRAR</Button>
    </Box>
  );
};
