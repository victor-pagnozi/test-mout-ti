import { Box, Button, CircularProgress, TextField } from "@mui/material";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchemaType } from "./login.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useSignin } from "./hooks/useSignin";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: yupResolver(loginSchema),
  });
  const { mutate, isPending } = useSignin();

  const submit = async (data: LoginSchemaType) => {
    if (isPending) return;

    mutate(data);
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
        <Link href={"users/create"}>
          <Button
            variant="outlined"
            sx={{
              width: 140,
            }}
          >
            CRIAR CONTA
          </Button>
        </Link>
        <Button
          variant="contained"
          type="submit"
          sx={{
            width: 140,
          }}
        >
          {isPending ? <CircularProgress color="inherit" /> : "ENTRAR"}
        </Button>
      </Box>
    </Box>
  );
};
