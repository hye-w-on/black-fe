import { Method, RestApiResponse } from '../models/restApi';
import { Menu } from '../pages/menu/MenuManagementPage';
import { callRestApi } from '../utils/RestApiUtil';
export const getManagementMenusApi = async (): Promise<RestApiResponse<Menu[]>> => {
  const response = await callRestApi({
    //service: Service.AQUA_BE,
    method: Method.GET,
    url: `/management/menu`,
  });
  return response;
};
