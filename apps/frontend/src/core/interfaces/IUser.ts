export interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  country_code: string | null;
  phone_number: string | null;
  date_of_birth: string | null;
  is_active: boolean;
  created_at: string;
}

export interface ListUsersApiResponse {
  records: UserData[];
  total_records: number;
}

export interface ListUsersResponseData {
  data: ListUsersApiResponse;
  message?: string;
  status?: boolean;
}

export interface FindUserResponse {
  data: UserData;
  message?: string;
  status?: boolean;
}