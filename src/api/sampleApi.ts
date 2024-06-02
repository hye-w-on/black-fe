import { Method, RestApiRequest, RestApiResponse, ServiceName } from '../models/restApi';
import { callRestApi } from '../utils/RestApiUtil';

export const getSamples = async () => {
  const request: RestApiRequest = {
    serviceName: ServiceName.AQUA_BE,
    method: Method.GET,
    url: `/samples`,
  };
  const response: RestApiResponse<any> = await callRestApi(request);

  return response;
};

export const getHealthCheck = async () => {
  const request: RestApiRequest = {
    serviceName: ServiceName.AQUA_BE,
    method: Method.GET,
    url: `/health`,
  };
  const response: RestApiResponse<any> = await callRestApi(request);
  return response;
};
