import { PaginationRequest } from './pagination';

export interface BbsPostCondition extends PaginationRequest {
  title?: string;
  catagory?: string;
  contents?: string;
}

export interface BbsPost {
  postNo: string;
  title: string;
  catagory: string;
  contents: string;
}
