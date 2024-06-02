import { Method, RestApiResponse } from '../models/restApi';
import { callRestApi } from '../utils/RestApiUtil';
export const getEmployeesApi = async (): Promise<RestApiResponse<any>> => {
  return callRestApi({
    //service: Service.AQUA_BE,
    method: Method.GET,
    url: `/http-session/scope`,
  });
};
