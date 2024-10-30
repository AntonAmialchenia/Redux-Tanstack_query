import { MutationObserver, useMutation } from '@tanstack/react-query';
import { AppThunk } from '../../shared/redux';
import { queryClient } from '../../shared/api/queryClient';
import { authApi } from './api';
import { authSlice } from './authSlice';

export const loginThunk =
  (login: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      const user = await new MutationObserver(queryClient, {
        mutationKey: ['login'],
        mutationFn: authApi.loginUser,
      }).mutate({
        login,
        password,
      });
      if (user) {
        dispatch(authSlice.actions.addUser({ userId: user.id }));
        queryClient.setQueryData(authApi.getUserById(user.id).queryKey, user);
        localStorage.setItem('userId', user.id);
      }
      dispatch(authSlice.actions.setError('Пароль или логин не верный'));
    } catch (error) {
      console.log(error);
    }
  };

export const useLoginLoading = () =>
  useMutation({ mutationKey: ['login'] }).isPending;
