import { useMutation } from '@tanstack/react-query';
import { todoListApi } from './api';
import { nanoid } from 'nanoid';
import { queryClient } from '../../shared/api/queryClient';

export const useCreateTodo = () => {
  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo,
    // onSuccess: () => {
    //   console.log('success');
    //   queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] });
    // второй вариант
    //   queryClient.invalidateQueries(todoListApi.getTodoListQueryOptions());
    // },
    onError: () => {
      console.log('error');
    },
    // личший вариант ревалидации. Асинхронная функция для того, что бы кооректно отображать лоодер
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] });
      console.log('onSettled');
    },
  });

  const handleCreateTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = String(formData.get('title') ?? '');
    const description = String(formData.get('description') ?? '');
    createTodoMutation.mutate({
      id: nanoid(),
      title: title,
      description: description,
      completed: false,
    });
    e.currentTarget.reset();
  };

  return { handleCreateTodo, isPending: createTodoMutation.isPending };
};
