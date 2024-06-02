export interface ReservationRequest {
  reservationNo: string;
  serviceDate: string;
  status: string;
  holder: string;
}

export interface ReservationResponse {
  reservationNo: string;
  serviceDate: string;
  status: string;
  holder: string;
}
