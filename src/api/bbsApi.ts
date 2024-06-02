import { BbsPost, BbsPostCondition } from '../models/bbs';
import { PaginationResponse } from '../models/pagination';
import { Method, RestApiResponse, ServiceName } from '../models/restApi';
import { callRestApi } from '../utils/RestApiUtil';

export const getBbsPostsApi = async (
  bbsPostCondition?: BbsPostCondition
): Promise<RestApiResponse<PaginationResponse<BbsPost[]>>> => {
  return callRestApi({
    serviceName: ServiceName.AQUA_BE,
    method: Method.GET,
    url: `/bbs/posts`,
    queryParams: new URLSearchParams({ ...bbsPostCondition }),
  });
};

export const deleteBbsPostApi = async (postNo: string): Promise<RestApiResponse<number>> => {
  return callRestApi({
    serviceName: ServiceName.AQUA_BE,
    method: Method.PATCH,
    url: `/bbs/post/${postNo}`,
  });
};
