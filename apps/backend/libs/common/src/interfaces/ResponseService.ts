export interface ResponseService<T = unknown> {
  status?: boolean;
  message?: string;
  httpStatusCode?: number;
  data?: T;
}

export interface ResponseBody<T> {
  id: string | null;
  status: boolean;
  message: string;
  data: T;
}
