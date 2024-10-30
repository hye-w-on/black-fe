import { BbsPost, BbsPostCondition } from '../models/bbs';
import { PaginationResponse } from '../models/pagination';
import { Method, RestApiResponse, ServiceName } from '../models/restApi';
import { callRestApi } from '../utils/RestApiUtil';

export const fetchBbsPostsApi = async (
  condition: BbsPostCondition,
  pageNo: number
): Promise<RestApiResponse<PaginationResponse<BbsPost[]>>> => {
  const pageSize = condition.pageSize ? Number(condition.pageSize) : 10;
  const bbsPostCondition: BbsPostCondition = {
    ...condition,
    pageSize: String(pageSize),
    start: String(pageSize * (pageNo - 1)),
  };

  // Test를 위한 2초지연
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await callRestApi({
    serviceName: ServiceName.AQUA_BE,
    method: Method.GET,
    url: `/bbs/posts`,
    queryParams: new URLSearchParams({ ...bbsPostCondition }),
  });
  return response;
};

export const deleteBbsPostApi = async (postNo: string): Promise<RestApiResponse<number>> => {
  return callRestApi({
    serviceName: ServiceName.AQUA_BE,
    method: Method.PATCH,
    url: `/bbs/post/${postNo}`,
  });
};
