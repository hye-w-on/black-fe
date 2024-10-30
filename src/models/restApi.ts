export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum SuccessOrNot {
  Y = 'Y',
  N = 'N',
}

export enum ServiceName {
  AQUA_BE = 'aqua-be',
  //AQUA_ADMIN_BE = 'aqua-admin-be',
}

export interface RestApiRequest {
  url: string;
  method: Method;
  serviceName?: string;
  queryParams?: URLSearchParams;
  headers?: object;
  body?: object;
}

export interface RestApiResponse<T = any> {
  successOrNot: string; //TODO : isSuccess 로 교체
  statusCode: string;
  data?: T;
}

export enum StatusCode {
  SUCCESS = 'SUCCESS',
  SESSION_EXPIRE = 'SESSION_EXPIRE',
  NOT_AUTHORIZED_EXCEPTION = 'NOT_AUTHORIZED_EXCEPTION',
  MANDATORY_PARAM_EXCEPTION = 'MANDATORY_PARAM_EXCEPTION',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}
