import { useAppDispatch, useAppSelector } from '../../shared/redux';
import { authSlice } from './authSlice';
import { loginThunk, useLoginLoading } from './loginThunk';

export const Login = () => {
  const dispatch = useAppDispatch();

  const isLoading = useLoginLoading();
  const loginError = useAppSelector(authSlice.selectors.loginError);

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    dispatch(
      loginThunk(
        formData.get('login')?.toString() ?? '',
        formData.get('password')?.toString() ?? '',
      ),
    );
  };
  
  return (
    <div className="p-5 border border-slate-500 rounded-lg mx-auto mt-10 max-w-2xl">
      <form className="flex flex-col gap-5" onSubmit={handelSubmit}>
        <h1 className="font-bold text-xl">Login</h1>
        <input name="login" className="p-5 rounded border border-slate-500" />
        <input
          name="password"
          className="p-5 rounded border border-slate-500"
        />
        {loginError && <div className="text-red-500">{loginError}</div>}
        <button
          disabled={isLoading}
          type="submit"
          className="p-5 rounded bg-teal-500 text-white disabled:bg-slate-300">
          Вход
        </button>
      </form>
    </div>
  );
};
