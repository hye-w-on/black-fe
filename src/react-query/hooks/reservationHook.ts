import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import {
  getMyReservationsApi,
  getReservationsApi,
  updateReservationApi,
} from '../../api/reservationApi';
import { ReservationRequest, ReservationResponse } from '../../models/reservation';
import { RestApiResponse } from '../../models/restApi';
import { useAlertStore } from '../../stores/AlertStore';
import { AxiosError } from 'axios';

const initialData: ReservationResponse[] = [
  {
    reservationNo: '1',
    serviceId: '',
    serviceDate: '0000',
    status: 'initialData',
    holder: '',
  },
];
const placeholderData: ReservationResponse[] = [
  {
    reservationNo: '1',
    serviceId: '',
    serviceDate: '0000',
    status: 'placeholderData',
    holder: '',
  },
];

const fallback: ReservationResponse[] = [
  {
    reservationNo: '1',
    serviceId: '',
    serviceDate: '0000',
    status: 'fallback',
    holder: '',
  },
];

export const useFetchReservations = () => {
  const { data: reservations, isFetching } = useQuery<
    RestApiResponse<ReservationResponse[]>,
    AxiosError,
    ReservationResponse[],
    string[]
  >({
    queryKey: [queryKeys.reservations],
    queryFn: getReservationsApi,
    select: (response) => response?.data ?? [],
    //staleTime: 1000 * 50,
    //cacheTime: 1000 * 10,
    //refetchOnMount: false,
    //refetchOnReconnect: true,
    //refetchOnWindowFocus: true,
    //refetchInterval: 1000, // 1초마다 refetch
    //initialData: initialData,
    //placeholderData: placeholderData,
  });

  return { reservations, isFetching };
};

//TODO :
export const useMyReservations = () => {
  const fallback: ReservationResponse[] = [];
  const memeber = { memeberId: '1' };
  const { data: reservations = fallback, isFetching } = useQuery({
    queryKey: [queryKeys.reservations, queryKeys.member, memeber.memeberId], //invalidateQueries([queryKeys.reservations])시 같이 무효화
    queryFn: () => getMyReservationsApi(memeber.memeberId),
    enabled: !!memeber,
  });

  return { reservations, isFetching };
};

export const useUpdateReservation = () => {
  //const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation<RestApiResponse<number>, Error, ReservationRequest>({
    mutationFn: (reservation: ReservationRequest) => updateReservationApi(reservation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.reservations] });
      useAlertStore.setState({ type: 'success', message: 'updated', open: true });
    },
  });
};
