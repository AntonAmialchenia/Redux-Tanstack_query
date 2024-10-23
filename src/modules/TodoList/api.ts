import {
  infiniteQueryOptions,
  // keepPreviousData,
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
  // пагинация
  // getTodoListQueryOptions: ({ page }: { page: number }) => {
  //   return queryOptions({
  //     queryKey: ['tasks', 'list', { page }],
  //     queryFn: (meta) =>
  //       jsonApiInstance<PaginatedResult<TodoDto>>(
  //         `/tasks?_page=${page}&_per_page=10`,
  //         {
  //           signal: meta.signal,
  //         },
  //       ),
  //     placeholderData: keepPreviousData,
  //   });
  // },
  baseKey: 'tasks',
  getTodoListQueryOptions: () => {
    return queryOptions({
      queryKey: [todoListApi.baseKey, 'list'],
      queryFn: (meta) =>
        jsonApiInstance<TodoDto[]>(`/tasks`, {
          signal: meta.signal,
        }),
    });
  },

  getTodoListInfiniteQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: [todoListApi.baseKey, 'list'],
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
  createTodo: (todo: TodoDto) => {
    return jsonApiInstance<TodoDto>('/tasks', {
      method: 'POST',
      json: todo,
    });
  },
  updateTodo: (id: string, todo: Partial<TodoDto>) => {
    return jsonApiInstance<TodoDto>(`/tasks/${id}`, {
      method: 'PATCH',
      json: todo,
    });
  },
  deleteTodo: (id: string) => {
    return jsonApiInstance(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};
