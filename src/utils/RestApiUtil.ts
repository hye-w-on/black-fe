import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { Method, RestApiRequest, RestApiResponse, ServiceName } from '../models/restApi';
//import useIsLoadingStore from 'store/LoadingStore';

axios.defaults.withCredentials = true; //Cookies 전달을 위해 설정

const getAxiosInstance = (request: RestApiRequest): AxiosInstance => {
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  //TODO
  //useIsLoadingStore.getState().setIsLoading(true); //js이기 때문에 setIsLoading로 바로 사용불가

  //TODO: getBaseURL 함수 분리
  let baseURL = '';

  switch (request.serviceName) {
    case ServiceName.AQUA_BE:
      if (import.meta.env.DEV) {
        baseURL = `${import.meta.env.VITE_API_BASE_URL}:${import.meta.env.VITE_API_BE_PORT}`;
      }
      break;
    default:
      baseURL = `${request.serviceName}${request.url}`;
      break;
  }

  // axios 인스턴스 생성
  // 메소드별 인스턴스 설정, request 설정이 없으면 default 값
  let config: AxiosRequestConfig = {};
  switch (request.method) {
    case Method.GET:
      config = {
        baseURL: baseURL,
        headers: request?.headers || {
          Accept: 'application/json',
        },
        params: request?.queryParams || {},
        responseType: 'json',
      };
      break;
    case Method.DELETE:
      config = {
        baseURL: baseURL,
        timeout: 3000,
        headers: request?.headers || {
          Accept: 'application/json',
        },
        params: request?.queryParams || {},
        responseType: 'json',
      };
      break;
    case Method.POST:
    case Method.PATCH:
    case Method.PUT:
      config = {
        baseURL: baseURL,
        timeout: 3000,
        headers: request?.headers || {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        responseType: 'json',
      };
      break;
  }
  const instance = axios.create(config);

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (config?.headers) {
        //config.headers["x-api-key"] = import.meta.env.VITE_API_KEY || "";
        //config.headers["x-correlation-id"] = "";
        config.headers['x-redis-session-id'] = sessionStorage.getItem('x-redis-session-id');
        config.headers['x-language-code'] = sessionStorage.getItem('languageCode');
        config.headers.Authorization = localStorage.getItem('idToken');
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    async (response: any): Promise<any> => {
      //useIsLoadingStore.getState().setIsLoading(false);
      //응답값이 file이라면, 나중에 util 분리
      if (response.data instanceof Blob) {
        const CommonBlobResponse: RestApiResponse<Blob> = {
          successOrNot: 'Y',
          statusCode: 'Success',
          data: new Blob([response?.data]),
        };

        return CommonBlobResponse;
      }

      const commonResponse: RestApiResponse = response.data as RestApiResponse;

      if (commonResponse.statusCode && commonResponse.statusCode === 'SESSION_EXPIRE') {
        sessionStorage.clear();
        // console.log('SESSION_EXPIRE');
        // window.location.assign('/login'); //컴포넌트가 아니면 router 라이브러리 사용이 불가하기 때문
      }
      return commonResponse;
    },

    async (error: any): Promise<any> => {
      //useIsLoadingStore.getState().setIsLoading(false);
      if (error.response && error.response.status.toString() === '401') {
        // window.location.assign('/login');
        console.log('401 UNAUTHORIZED');
      }

      return Promise.reject(error); //이렇게 넘겨야 react query에서 에러를 잡을 수 있음
    }
  );

  return instance;
};

//미사용
/*
export interface QueryParams {
  [key: string]: string | number | boolean;
}
const getQueryStringFormat = (queryParams?: QueryParams): string => {
  if (!queryParams) return "";
  const keys = Object.keys(queryParams);
  const queryString = keys
    .filter(
      (key) => queryParams[key] !== null && queryParams[key] !== undefined
    )
    .map((key) => `${key}=${encodeURIComponent(queryParams[key] as string)}`) // eslint-disable-line
    .join("&");
  return queryString ? `?${queryString}` : "";
};
*/

export const callRestApi = async (apiRequest: RestApiRequest): Promise<RestApiResponse> => {
  //const url: string = apiRequest.url + getQueryStringFormat(apiRequest?.queryParams);

  let response: RestApiResponse = {
    successOrNot: 'N',
    statusCode: 'UNKNOWN_ERROR',
    data: {},
  };

  switch (apiRequest.method) {
    case Method.GET:
      response = await getAxiosInstance(apiRequest).get(apiRequest.url);
      break;
    case Method.POST:
      response = await getAxiosInstance(apiRequest).post(apiRequest.url, apiRequest?.body || {});
      break;
    case Method.PUT:
      response = await getAxiosInstance(apiRequest).put(apiRequest.url, apiRequest?.body || {});
      break;
    case Method.DELETE:
      response = await getAxiosInstance(apiRequest).delete(apiRequest.url);
      break;
    case Method.PATCH:
      response = await getAxiosInstance(apiRequest).patch(apiRequest.url, apiRequest?.body || {});
      break;
    default:
      break;
  }
  return response;
};

//TODO : 분리
export const callDownroadApi = async (apiRequest: RestApiRequest): Promise<AxiosResponse<Blob>> => {
  const response: AxiosResponse<Blob> = await getAxiosInstance(apiRequest).get(apiRequest.url, {
    responseType: 'blob',
  });
  return response;
};
