import { Box, Button, TextField } from "@mui/material";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchemaType } from "./login.schema";
import { yupResolver } from "@hookform/resolvers/yup";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: yupResolver(loginSchema),
  });

  const submit = (data: LoginSchemaType) => {
    console.log(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: 2,
        width: {
          xs: "100%",
          sm: 400,
          md: 500,
          lg: 600,
          xl: 700,
        },
        height: 400,
        gap: 3,
        padding: 4,
      }}
      component="form"
      onSubmit={handleSubmit(submit)}
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

      <TextField
        label="E-mail"
        sx={{ width: "100%" }}
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        type="password"
        label="Senha"
        sx={{ width: "100%" }}
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Box sx={{ display: "flex", gap: 4 }}>
        <Button
          variant="outlined"
          sx={{
            width: 140,
          }}
        >
          CRIAR CONTA
        </Button>
        <Button
          variant="contained"
          type="submit"
          sx={{
            width: 140,
          }}
        >
          ENTRAR
        </Button>
      </Box>
    </Box>
  );
};
