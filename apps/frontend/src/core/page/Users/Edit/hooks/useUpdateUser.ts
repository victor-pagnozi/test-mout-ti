import { emitToastEvent } from "@/core/common/functions/emitToastEvent";
import apiInstance from "@/core/config/api";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { FormUserData } from "../../components/FormUser/formUser.schema";

export const useUpdateUser = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async (data: FormUserData) => {
      const { data: response } = await apiInstance.put(`/user/${id}`, data);

      return response;
    },
    onSuccess: () => {
      emitToastEvent({
        message: "Usuário atualizado com sucesso!",
      });

      router.push("/users");
    },
    onError: (error) => {
      emitToastEvent({
        message: "Erro ao atualizar usuário.",
        severity: "error",
      });
      console.error("Error updating user:", error);
    },
  });

  return { mutate, isPending };
};
