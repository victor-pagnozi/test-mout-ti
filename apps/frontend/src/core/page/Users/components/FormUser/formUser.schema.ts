import * as yup from "yup";

export const formUserSchema = yup.object({
  first_name: yup.string().required("Nome é obrigatório"),
  last_name: yup.string().required("Sobrenome é obrigatório"),
  email: yup
    .string()
    .email("Formato de email inválido")
    .required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
  country_code: yup.string().optional(),
  phone_number: yup
    .string()
    .max(15, "Número de telefone deve ter no máximo 15 caracteres")
    .optional(),
  date_of_birth: yup.date().optional(),
  is_active: yup.boolean().optional(),
});

export type FormUserData = yup.InferType<typeof formUserSchema>;
