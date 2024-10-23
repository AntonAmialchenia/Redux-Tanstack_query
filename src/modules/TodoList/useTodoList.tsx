import {  useQuery } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import { todoListApi } from './api';

export const useTodoList = () => {
  // бесконечный скролл
  // const {
  //   data: todoItems,
  //   error,
  //   isLoading,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  // } = useInfiniteQuery({
  //   ...todoListApi.getTodoListInfiniteQueryOptions(),
  // });

  const {
    data: todoItems,
    error,
    isLoading,
  } = useQuery({
    ...todoListApi.getTodoListQueryOptions(),
    select: data => data.reverse()
  });

//   const cursorRef = useIntersection(() => fetchNextPage());

//   const cursor = (
//     <div ref={cursorRef} className="flex items-center gap-4">
//       {hasNextPage && <div>нет данных для загрузки</div>}
//       {isFetchingNextPage && <div>Loading...</div>}
//     </div>
//   );
  return {
    todoItems,
    error,
    isLoading,
  };
};

export const useIntersection = (onIntersect: () => void) => {
  const unsubscribe = useRef(() => {});

  return useCallback((el: HTMLDivElement | null) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      });
    });
    if (el) {
      observer.observe(el);
      unsubscribe.current = () => observer.disconnect();
    } else {
      unsubscribe.current();
    }
  }, []);
};
