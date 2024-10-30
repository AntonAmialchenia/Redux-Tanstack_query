import { useAppDispatch } from '../../shared/redux';
import { logoutThunk } from './LogoutThunk';

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => dispatch(logoutThunk())}
      className="border border-rose-500 rounded p-3">
      Выход
    </button>
  );
};
