import { useQuery } from "@tanstack/react-query";
import apiInstance from "@/core/config/api";
import { QueryKeys } from "@/core/common/enums/query-keys";
import {
  ListUsersApiResponse,
  ListUsersResponseData,
} from "@/core/interfaces/IUser";

export const useListUsers = () => {
  return useQuery<ListUsersApiResponse, Error>({
    queryKey: [QueryKeys.LIST_USERS],
    queryFn: async () => {
      const response = await apiInstance.get<ListUsersResponseData>("/user");
      return response.data.data;
    },
  });
};
