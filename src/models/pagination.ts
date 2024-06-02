export interface PaginationResponse<T> {
  totalCount: number;
  list: T;
}

export interface PaginationRequest {
  pageSize?: string; //URLSearchParams에서는 string 으로만 받는다.
  start?: string;
}
