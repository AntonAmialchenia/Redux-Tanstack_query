import { Login } from '../modules/auth/Login';
import { LogoutButton } from '../modules/auth/logoutButton';
import { useUser } from '../modules/auth/useUser';
import { TodoList } from '../modules/TodoList';

export function App() {
  const user = useUser();
  console.log(user.data);
  if (user.isLoading) {
    return <div>Loading...</div>;
  }
  if (user.data) {
    return (
      <>
        <LogoutButton />
        <TodoList />
      </>
    );
  }
  return <Login />;
}
