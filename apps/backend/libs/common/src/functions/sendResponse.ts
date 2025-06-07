import { HttpStatus } from '@nestjs/common';
import { ResponseBody, ResponseService } from '../interfaces/ResponseService';

export function sendResponse<T>(
  response: ResponseService<T>,
  requestId?: string,
) {
  const httpStatusCode = response.httpStatusCode ?? HttpStatus.OK;

  const isSuccess =
    typeof response.status === 'boolean'
      ? response.status
      : httpStatusCode >= (HttpStatus.OK as number) &&
        httpStatusCode < (HttpStatus.AMBIGUOUS as number);

  const responseBody = {
    id: requestId ?? null,
    status: isSuccess,
    message: response.message ?? '',
    data: response.data ?? null,
  } as ResponseBody<T>;

  return responseBody;
}
