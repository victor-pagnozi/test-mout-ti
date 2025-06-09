import { QueryKeys } from "@/core/common/enums/query-keys";
import { useMutation } from "@tanstack/react-query";
import { FormUserData } from "../../components/FormUser/formUser.schema";
import apiInstance from "@/core/config/api";
import { useRouter } from "next/navigation";
import { emitToastEvent } from "@/core/common/functions/emitToastEvent";

export const useCreateClient = () => {
  const { push } = useRouter();

  const { data, isPending, mutate } = useMutation({
    mutationKey: [QueryKeys.CREATE_USER],
    mutationFn: async (data: FormUserData) => {
      const { data: response } = await apiInstance.post("/user", data);

      return response;
    },
    onSuccess: () => {
      emitToastEvent({
        message: "Usuário criado com sucesso!",
      });

      push("/users");
    },
    onError: (error) => {
      emitToastEvent({
        message: "Erro ao criar usuário.",
        severity: "error",
      });

      console.error("Error creating user:", error);
    },
  });

  return {
    data,
    isPending,
    mutate,
  };
};
