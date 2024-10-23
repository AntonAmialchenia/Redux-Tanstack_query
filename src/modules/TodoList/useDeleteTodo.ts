import { useMutation } from '@tanstack/react-query';
import { todoListApi } from './api';
import { queryClient } from '../../shared/api/queryClient';

export const useDeleteTodo = () => {
  const deleteTodoMutation = useMutation({
    mutationFn: todoListApi.deleteTodo,
    onError: () => {
      console.log('error');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] });
      console.log('onSettled');
    },
    onSuccess: async (_, deleteId) => {
      console.log('onSuccess');
      const todos = queryClient.getQueryData(
        todoListApi.getTodoListQueryOptions().queryKey,
      );
      if (todos) {
        queryClient.setQueryData(
          todoListApi.getTodoListQueryOptions().queryKey,
          todos.filter((todo) => todo.id !== deleteId),
        );
      }
    },
  });

  return {
    handleDeleteTodo: deleteTodoMutation.mutate,
    getIsPending: (id: string) =>
      deleteTodoMutation.isPending && deleteTodoMutation.variables === id,
  };
};
