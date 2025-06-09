"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormUser } from "../components/FormUser";
import { Control, useForm } from "react-hook-form";
import {
  FormUserData,
  formUserSchema,
} from "../components/FormUser/formUser.schema";
import { Box } from "@mui/material";
import { useCreateClient } from "./hooks/useCreateClient";

export const CreateUserPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
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
  const { isPending, mutate } = useCreateClient();

  const onSubmit = async (data: FormUserData) => {
    const cleanedData = {
      ...data,
      phone_number: data.phone_number?.replace(/\D/g, ""),
    };

    mutate(cleanedData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ p: 3, maxWidth: 600 }}
    >
      {errors.root?.message}
      {errors.country_code?.message}
      {errors.date_of_birth?.message}
      {errors.email?.message}
      {errors.first_name?.message}
      {errors.is_active?.message}
      {errors.last_name?.message}
      {errors.password?.message}
      {errors.phone_number?.message}
      <FormUser
        control={control as Control<FormUserData>}
        errors={errors}
        isLoading={isPending}
      />
    </Box>
  );
};
