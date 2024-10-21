import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from '@tanstack/react-query';
import { jsonApiInstance } from '../../shared/api/apIIstance';

type PaginatedResult<T> = {
  data: T[];
  first: number;
  items: number;
  last: number;
  next: number;
  pages: number;
  prev: number | null;
};

interface TodoDto {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const todoListApi = {
  getTodoListQueryOptions: ({ page }: { page: number }) => {
    return queryOptions({
      queryKey: ['tasks', 'list', { page }],
      queryFn: (meta) =>
        jsonApiInstance<PaginatedResult<TodoDto>>(
          `/tasks?_page=${page}&_per_page=10`,
          {
            signal: meta.signal,
          },
        ),
      placeholderData: keepPreviousData,
    });
  },

  getTodoListInfiniteQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ['tasks', 'list'],
      queryFn: (meta) =>
        jsonApiInstance<PaginatedResult<TodoDto>>(
          `/tasks?_page=${meta.pageParam}&_per_page=10`,
          {
            signal: meta.signal,
          },
        ),
      initialPageParam: 1,
      getNextPageParam: (result) => result.next,
      select: (data) => data.pages.flatMap((page) => page.data),
    });
  },
};
