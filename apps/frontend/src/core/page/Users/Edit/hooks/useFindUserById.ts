import { useQuery } from "@tanstack/react-query";
import apiInstance from "@/core/config/api";
import { QueryKeys } from "@/core/common/enums/query-keys";
import { FindUserResponse, UserData } from "@/core/interfaces/IUser";
import { useParams } from "next/navigation";

export const useFindUserById = () => {
  const { id } = useParams<{ id: string }>();

  return useQuery<UserData, Error>({
    queryKey: [QueryKeys.FIND_USER],
    queryFn: async () => {
      const response = await apiInstance.get<FindUserResponse>(`/users/${id}`);

      return response.data.data;
    },
  });
};
