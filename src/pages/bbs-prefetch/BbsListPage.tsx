/**
 * @description ReactQuery Pagination Prefetch 사용 예제
 *
 * 1. 페이지를 이동하면(pageNo 변경) 캐시된 데이터가 없기 때문에 조회하는 동안 빈 화면
 * => useQuery의 placeholderData: keepPreviousData 설정으로 이전 데이터를 보여줌
 * => pageNo가 변경되어도 이전 데이터가 남아있어 UX상으로 이질적일 수 있음
 * 2. 조회가 예상되는 pageNo 데이터를 prefetch
 * => prefetch 하지않은 데이터는 없어서 빈 화면, 모든 데이터를 커버 할 수 없음
 **/

import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BbsPost, BbsPostCondition } from '../../models/bbs';
import { deleteBbsPostApi } from '../../api/bbsApi';
import {
  useBbsPosts,
  useDeleteBbsPostMutate,
  usePrefetchBbsPosts,
} from '../../react-query/hooks/bbsHook';

//style
import styled from '@emotion/styled';
import { Backdrop, CircularProgress } from '@mui/material';
import { ActionButton, ActionDeleteButton } from '../../components/atoms/Button';

//icon
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { queryKeys } from '../../react-query/queryKeys';

const BbsListPage = () => {
  const [selectedPageNo, setSelectedPageNo] = useState(1);

  const [pageSize, setPageSize] = useState<number>(10);
  const pagaNoListLength = 10;
  const [pageNoList, setPageNoList] = useState<number[]>([]);
  const [lastPageNo, setLastedageNo] = useState<number>(0);
  const [bbsPostCondition, setBbsPostCondition] = useState<BbsPostCondition>({});

  //console.log('compoenet loaded');

  const getRange = (start: number, length: number) => {
    return Array.from({ length }, (_, i) => start + i);
  };

  const {
    data: posts,
    isLoading,
    //isError,
    //isFetching,
    //isFetched,
    //isSuccess,
    refetch, //쿼리 재조회 함수
  } = useBbsPosts(bbsPostCondition, selectedPageNo);

  const queryClient = useQueryClient();
  usePrefetchBbsPosts(queryClient, bbsPostCondition, selectedPageNo, lastPageNo);

  const deleteMutation = useDeleteBbsPostMutate();

  const handlePageNoClick = (pageNo: number) => {
    setSelectedPageNo(pageNo);
  };

  const handleDeletePostClick = (postNo: string) => {
    deleteMutation.mutate(postNo, {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries({ queryKey: [queryKeys.posts] });
      },
    });
    //refetch();
  };

  useEffect(() => {
    const totalCount = posts?.totalCount || 0;
    const lastPageNo = Math.ceil(totalCount / pageSize);
    setPageNoList(getRange(1, lastPageNo));
    setLastedageNo(lastPageNo);
  }, [posts, pageSize]);

  return (
    <>
      {/* useIsFetching이 prefetchQuery와 useQuery를 구분하지 못해 spinner 공통화 불가 */}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" /> Loading...
      </Backdrop>
      {/* 게시글 목록 */}
      {posts?.list &&
        posts.list.map((post: BbsPost) => {
          return (
            <Post key={post.postNo}>
              {post.title} <ActionDeleteButton onClick={() => handleDeletePostClick(post.postNo)} />
            </Post>
          );
        })}
      {/* 페이지네이션 컴포넌트 */}
      <ActionButton
        id="previousPage"
        disabled={lastPageNo == 0 || selectedPageNo <= 1}
        onClick={() => {
          setSelectedPageNo((prePageNo) => prePageNo - 1);
        }}
      >
        <ArrowBackIosRoundedIcon fontSize="inherit" />
      </ActionButton>
      <PageNoList>
        {pageNoList &&
          pageNoList.map((pageNo) => (
            <span
              key={pageNo}
              className={pageNo == selectedPageNo ? 'selected' : ''}
              onClick={() => handlePageNoClick(pageNo)}
            >
              {pageNo}
            </span>
          ))}
      </PageNoList>
      <ActionButton
        id="nextPage"
        disabled={lastPageNo == 0 || selectedPageNo >= lastPageNo}
        onClick={() => {
          setSelectedPageNo((prePageNo) => prePageNo + 1);
        }}
      >
        <ArrowForwardIosRoundedIcon fontSize="inherit" />
      </ActionButton>
    </>
  );
};

export default BbsListPage;

const PageNoList = styled.div`
  display: inline-flex;
  margin: 4px;

  span {
    display: inline-flex;
    margin: 0 2px 0 2px;
    &.selected {
      font-weight: 800;
    }
  }
`;
const Post = styled.div`
  display: flex;
  align-items: center;
  //temp
  width: 200px;
  border: solid gray;
  border-width: 0px 1px 0px 0px;
`;
