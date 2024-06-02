import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
//import { useAlertStore } from "../store/AlertStore";

const queryErrorHandler = (error: unknown): void => {
  //useAlertStore.setState({ type: 'error', message: 'Network Error : 서버에 접속할 수 없습니다', open: true });
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: queryErrorHandler, //retry가 모두 실패했을 경우만 호출됨, retry로 인한 중복호출 방지
  }),
  mutationCache: new MutationCache({
    onError: queryErrorHandler, //retry가 모두 실패했을 경우만 호출됨, retry로 인한 중복호출 방지
  }),
  defaultOptions: {
    queries: {
      //onError: queryErrorHandler, // 이렇게 사용하지말 것
      retry: 2,
      //refetchOnWindowFocus: false,
      //refetchOnMount: false,
      //keepPreviousData: false,
      staleTime: 0,
      throwOnError: true,
    },
    mutations: {
      //onError: queryErrorHandler, // 이렇게 사용하지말 것
    },
  },
});
