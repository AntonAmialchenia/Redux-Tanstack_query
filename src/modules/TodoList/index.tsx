import { useTodoList } from './useTodoList';
import { useCreateTodo } from './useCreateTodo';
import { useDeleteTodo } from './useDeleteTodo';
import { useUpdateTodo } from './useUpdateTodo';

export const TodoList = () => {
  const { error, isLoading, todoItems } = useTodoList();
  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div className="p-5 mx-auto max-w-[1200px] mt-10">
      <h1 className="text-3xl font-bold underline mb-5">TodoList</h1>
      <form
        onSubmit={createTodo.handleCreateTodo}
        className=" flex flex-col gap-4 max-w-lg mb-5">
        <input
          className="rounded border border-teal-500 p-2"
          type="text"
          name="title"
          placeholder="title"
        />
        <input
          className="rounded border border-teal-500 p-2"
          type="text"
          name="description"
          placeholder="description"
        />
        <button
          disabled={createTodo.isPending}
          className="border rounded disabled:opacity-50 p-2 disabled:bg-slate-500 disabled:cursor-not-allowed"
          type="submit">
          Создать
        </button>
      </form>

      <div className={'flex flex-col gap-4 mb-4 '}>
        {todoItems?.map((item) => (
          <div
            className="border border-slate-500 rounded p-3 flex items-center justify-between"
            key={item.id}>
            <div>
              <p className="text-lg font-medium">{item.title}</p>
              <p>{item.description}</p>
            </div>
            <div className="flex gap-4 items-center">
              <input
                type="checkbox"
                onChange={() => updateTodo.toggleTodo(item.id, item.completed)}
                readOnly
                checked={item.completed}
              />
              <button
                className="border rounded disabled:opacity-50 p-2 disabled:bg-slate-500 disabled:cursor-not-allowed"
                disabled={deleteTodo.getIsPending(item.id)}
                onClick={() => deleteTodo.handleDeleteTodo(item.id)}>
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* {cursor} */}
    </div>
  );
};
