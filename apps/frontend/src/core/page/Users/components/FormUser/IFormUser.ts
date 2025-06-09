import { Control, FieldErrors } from "react-hook-form";
import { FormUserData } from "./formUser.schema";

export interface IFormUserProps {
  control: Control<FormUserData>;
  errors: FieldErrors<FormUserData>;
  isLoading: boolean;
}
