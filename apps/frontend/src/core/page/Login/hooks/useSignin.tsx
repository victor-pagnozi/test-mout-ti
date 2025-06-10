import { useMutation } from "@tanstack/react-query";
import { LoginSchemaType } from "../login.schema";
import { emitToastEvent } from "@/core/common/functions/emitToastEvent";
import apiInstance from "@/core/config/api";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export const useSignin = () => {
  const { push } = useRouter();

  const { mutate, data, isPending } = useMutation({
    mutationFn: async (data: LoginSchemaType) => {
      const response = await apiInstance.post("/auth/signin", data);

      console.log(response);

      if (response.status !== 201) {
        throw new Error("Login falhou. Verifique suas credenciais.");
      }

      return response.data;
    },
    onSuccess: () => {
      emitToastEvent({
        message: "Usuário logado com sucesso",
      });

      push("/users");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error);
      emitToastEvent({
        message: error.response?.data?.message ?? "Erro ao fazer login",
        severity: "error",
      });
    },
  });

  return { mutate, data, isPending };
};
