import { QueryClient, keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import { BbsPostCondition } from '../../models/bbs';
import { deleteBbsPostApi, fetchBbsPostsApi } from '../../api/bbsApi';

// Fetch Hook
export const useBbsPosts = (condition: BbsPostCondition, selectedPageNo: number) => {
  return useQuery({
    queryKey: [queryKeys.posts, selectedPageNo],
    queryFn: () => {
      return fetchBbsPostsApi(condition, selectedPageNo);
    },
    placeholderData: keepPreviousData,
    select: (response) => {
      return response.data;
    },
  });
};

// Prefetch Hook
export const usePrefetchBbsPosts = (
  queryClient: QueryClient,
  condition: BbsPostCondition,
  selectedPageNo: number,
  lastPageNo: number
) => {
  //console.log('Call usePrefetchBbsPosts:' + ' selectedPageNo:' + selectedPageNo + ' lastPageNo:' + lastPageNo);

  //최초에는 lastPageNo를 알 수 없으므로 최초 조회가 성공한 이후에 prefetch를 수행한다.
  if (lastPageNo <= 0) return;

  const prePage = selectedPageNo - 1;
  const nextPage = selectedPageNo + 1;

  //다음페이지 prefetch
  if (nextPage <= lastPageNo) {
    queryClient.prefetchQuery({
      queryKey: [queryKeys.posts, nextPage],
      queryFn: () => {
        //console.log('nextPage');
        return fetchBbsPostsApi(condition, nextPage);
      },
    });
  }
  //이전페이지 prefetch
  if (prePage > 0) {
    queryClient.prefetchQuery({
      queryKey: [queryKeys.posts, prePage],
      queryFn: () => {
        //console.log('prePage');
        return fetchBbsPostsApi(condition, prePage);
      },
    });
  }
};

// Delete Mutate Hook
export const useDeleteBbsPostMutate = () => {
  return useMutation({ mutationFn: (postNo: string) => deleteBbsPostApi(postNo) });
};
