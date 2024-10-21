import {
  // keepPreviousData,
  useInfiniteQuery,
  // useQuery,
} from '@tanstack/react-query';
import { todoListApi } from './api';
import { useCallback, useRef, useState } from 'react';

export const TodoList = () => {
  // const [page, setPage] = useState(1);
  const [enabled, setEnabled] = useState(false);
  // const {
  //   data: todoItems,
  //   error,
  //   isPlaceholderData,
  //   isLoading,
  // } = useQuery({
  //   ...todoListApi.getTodoListQueryOptions({page}),
  //   enabled,
  // });

  const {
    data: todoItems,
    error,
    isPlaceholderData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...todoListApi.getTodoListInfiniteQueryOptions(),
    enabled,
  });

  const cursorRef = useIntersection(() => fetchNextPage());

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div className="p-5 mx-auto max-w-[1200px] mt-10">
      <h1 className="text-3xl font-bold underline mb-5">TodoList</h1>
      <button
        className="mb-3 rounded border p-2"
        onClick={() => setEnabled((e) => !e)}>
        Toggle enabled
      </button>
      <div
        className={
          'flex flex-col gap-4 mb-4 ' + (isPlaceholderData ? 'opacity-50' : '')
        }>
        {todoItems?.map((item) => (
          <div className="border border-slate-500 rounded p-3" key={item.id}>
            {item.title}
          </div>
        ))}
      </div>
      <div ref={cursorRef} className="flex items-center gap-4">
        {hasNextPage && <div>нет данных для загрузки</div>}
        {isFetchingNextPage && <div>Loading...</div>}
        {/* <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="p-2 rounded border border-teal-500">
          prev
        </button>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, todoItems?.pages ?? 1))}
          className="p-2 rounded border border-teal-500">
          next
        </button> */}
      </div>
    </div>
  );
};

const useIntersection = (onIntersect: () => void) => {
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
