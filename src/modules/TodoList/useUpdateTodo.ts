import { useMutation } from '@tanstack/react-query';
import { todoListApi } from './api';
import { queryClient } from '../../shared/api/queryClient';

export const useUpdateTodo = () => {
  const updateTodoMutation = useMutation({
    mutationFn: todoListApi.updateTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: [todoListApi.baseKey] });

      const previousTodo = queryClient.getQueryData(
        todoListApi.getTodoListQueryOptions().queryKey,
      );

      queryClient.setQueryData(
        todoListApi.getTodoListQueryOptions().queryKey,
        (old) =>
          old?.map((todo) =>
            todo.id === newTodo.id ? { ...todo, ...newTodo } : todo,
          ),
      );

      return { previousTodo };
    },
    // If the mutation fails, use the context we returned above
    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(
          [todoListApi.baseKey, context.previousTodo],
          context.previousTodo,
        );
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey],
      });
    },
  });

  const toggleTodo = (id: string, done: boolean) => {
    updateTodoMutation.mutate({
      id,
      completed: !done,
    });
  };

  return { toggleTodo, isPending: updateTodoMutation.isPending };
};
