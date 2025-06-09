"use client";
import { Control, useForm } from "react-hook-form";
import {
  FormUserData,
  formUserSchema,
} from "../components/FormUser/formUser.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateUser } from "./hooks/useUpdateUser";
import { Alert, Box, CircularProgress } from "@mui/material";
import { FormUser } from "../components/FormUser";
import { useFindUserById } from "./hooks/useFindUserById";
import { useEffect } from "react";

export const EditUserPage = () => {
  const { data: user, isLoading, error } = useFindUserById();
  const { mutate: updateUser, isPending } = useUpdateUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(formUserSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      country_code: "+55",
      phone_number: "",
      date_of_birth: undefined,
      is_active: true,
    },
  });

  useEffect(() => {
    setValue("first_name", user?.first_name ?? "");
    setValue("last_name", user?.last_name ?? "");
    setValue("email", user?.email ?? "");
    setValue("country_code", user?.country_code ?? "+55");
    setValue("phone_number", user?.phone_number ?? "");
    setValue(
      "date_of_birth",
      user?.date_of_birth ? new Date(user.date_of_birth) : undefined
    );
    setValue("is_active", user?.is_active ?? true);
  }, [user, setValue]);

  const onSubmit = async (data: FormUserData) => {
    const cleanedData = {
      ...data,
      phone_number: data.phone_number?.replace(/\D/g, ""),
    };

    updateUser(cleanedData);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Erro ao carregar dados do usuário.</Alert>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ p: 3, maxWidth: 600 }}
    >
      <FormUser
        control={control as Control<FormUserData>}
        errors={errors}
        isLoading={isPending}
      />
    </Box>
  );
};
