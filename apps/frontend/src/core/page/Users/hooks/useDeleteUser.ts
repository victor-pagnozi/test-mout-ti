// File: apps/frontend/src/core/page/Users/hooks/useDeleteUser.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiInstance from "@/core/config/api";
import { QueryKeys } from "@/core/common/enums/query-keys"; // Make sure QueryKeys.LIST_USERS is defined
import { emitToastEvent } from "@/core/common/functions/emitToastEvent";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (userId: string) => {
      await apiInstance.delete(`/user/${userId}`);
    },
    onSuccess: () => {
      emitToastEvent({
        message: "Usuário excluído com sucesso!",
        // severity: "success", // You might want to add severity to emitToastEvent
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.LIST_USERS] });
    },
    onError: (error) => {
      emitToastEvent({
        message: "Erro ao excluir usuário.",
        severity: "error",
      });
      console.error("Error deleting user:", error);
    },
  });
};
