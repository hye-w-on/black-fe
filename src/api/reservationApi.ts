import { ReservationRequest, ReservationResponse } from '../models/reservation';
import { Method, RestApiResponse, ServiceName } from '../models/restApi';
import { callRestApi } from '../utils/RestApiUtil';

export const getReservationsApi = async (): Promise<RestApiResponse<ReservationResponse[]>> => {
  return callRestApi({
    serviceName: ServiceName.AQUA_BE,
    method: Method.GET,
    url: `/reservations`,
  });
};

export const getMyReservationsApi = async (
  memeberId: string
): Promise<RestApiResponse<ReservationResponse[]>> => {
  return callRestApi({
    serviceName: ServiceName.AQUA_BE,
    method: Method.GET,
    url: `/reservations`,
    body: { memeberId: memeberId },
  });
};

export const updateReservationApi = async (
  reservation: ReservationRequest
): Promise<RestApiResponse<number>> => {
  const response = await callRestApi({
    serviceName: ServiceName.AQUA_BE,
    method: Method.PUT,
    url: `/reservation`,
    body: reservation,
  });
  return response;
};
