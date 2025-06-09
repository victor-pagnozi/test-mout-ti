export interface IToastProps {
  message: string;
  open: boolean;
  autoHideDuration?: number;
  severity?: "error" | "warning" | "info" | "success";
}
