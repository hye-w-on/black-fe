export interface ReservationRequest {
  reservationNo: string;
  serviceId: string;
  serviceDate: string;
  status: string;
  holder: string;
}

export interface ReservationResponse {
  reservationNo: string;
  serviceId: string;
  serviceDate: string;
  status: string;
  holder: string;
  updatedDatetime?: string;
}
