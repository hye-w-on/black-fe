import { QueryClient, useQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import { BbsPostCondition } from '../../models/bbs';
import { getBbsPostsApi } from '../../api/bbsApi';

//Fetch
export const fetchBbsPosts = async (pageNo: number, condition: BbsPostCondition) => {
  const pageSize = condition.pageSize ? Number(condition.pageSize) : 10;
  const bbsPostCondition: BbsPostCondition = {
    ...condition,
    pageSize: String(pageSize),
    start: String(pageSize * (pageNo - 1)),
  };

  const response = await getBbsPostsApi(bbsPostCondition);
  return response.data;
};
// Fetch Hook
export const useBbsPosts = (selectedPageNo: number, condition: BbsPostCondition) => {
  return useQuery({
    queryKey: [queryKeys.posts, selectedPageNo],
    queryFn: () => {
      return fetchBbsPosts(selectedPageNo, condition);
    },
  });
};

// Prefetch
export const usePrefetchBbsPosts = (
  queryClient: QueryClient,
  selectedPageNo: number,
  lastPageNo: number,
  condition: BbsPostCondition
) => {
  //console.log('Call usePrefetchBbsPosts:' + ' selectedPageNo:' + selectedPageNo + ' lastPageNo:' + lastPageNo);

  //최초에는 lastPageNo를 알 수 없으므로 최초 조회가 성공한 이후에 prefetch를 수행한다.
  if (lastPageNo <= 0) return;

  const prePage = selectedPageNo - 1;
  const nextPage = selectedPageNo + 1;

  //다음페이지 prefetch
  if (nextPage <= lastPageNo) {
    queryClient.prefetchQuery({
      queryKey: [(queryKeys.posts, nextPage)],
      queryFn: () => {
        //console.log('nextPage');
        return fetchBbsPosts(nextPage, condition);
      },
    });
  }
  //이전페이지 prefetch
  if (prePage > 0) {
    queryClient.prefetchQuery({
      queryKey: [queryKeys.posts, prePage],
      queryFn: () => {
        //console.log('prePage');
        return fetchBbsPosts(prePage, condition);
      },
    });
  }
};
