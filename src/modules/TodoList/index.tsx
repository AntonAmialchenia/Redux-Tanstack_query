import { useTodoList } from './useTodoList';

export const TodoList = () => {
  const { cursor, error, isLoading, todoItems } = useTodoList();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div className="p-5 mx-auto max-w-[1200px] mt-10">
      <h1 className="text-3xl font-bold underline mb-5">TodoList</h1>

      <div className={'flex flex-col gap-4 mb-4 '}>
        {todoItems?.map((item) => (
          <div className="border border-slate-500 rounded p-3" key={item.id}>
            {item.title}
          </div>
        ))}
      </div>
      {cursor}
    </div>
  );
};
