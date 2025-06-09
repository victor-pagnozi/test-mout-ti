import {
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { maskPhoneNumber } from "@/core/common/functions/masks/phoneNumber";
import { IFormUserProps } from "./IFormUser";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

export const FormUser = ({ control, errors, isLoading }: IFormUserProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Criar Novo Usuário
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Nome"
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Sobrenome"
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="E-mail"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Senha
                </InputLabel>
                <OutlinedInput
                  {...field}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  error={!!errors.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Senha"
                />
                {errors.password && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ ml: 2, mt: 0.5 }}
                  >
                    {errors.password.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="country_code"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Código do País"
                placeholder="+55"
                error={!!errors.country_code}
                helperText={errors.country_code?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="phone_number"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Número de Telefone"
                placeholder="(11) 91234-5678"
                error={!!errors.phone_number}
                helperText={errors.phone_number?.message}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const maskedValue = maskPhoneNumber(e.target.value);
                  field.onChange(maskedValue);
                }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="date_of_birth"
            control={control}
            render={({ field }) => (
              <DatePicker
                value={moment(field.value)}
                onChange={(newValue) =>
                  field.onChange(`${newValue?.format("YYYY-MM-DD")}`)
                }
                label="Data de Nascimento"
                format="DD/MM/YYYY"
                sx={{
                  width: "100%",
                }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="is_active"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Usuário Ativo"
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
          >
            {isLoading ? <CircularProgress color="inherit" /> : "SALVAR"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
