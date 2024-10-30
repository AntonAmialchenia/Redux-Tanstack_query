import { AppThunk } from '../../shared/redux';
import { queryClient } from '../../shared/api/queryClient';
import { authSlice } from './authSlice';

export const logoutThunk = (): AppThunk => async (dispatch) => {
  dispatch(authSlice.actions.removeUser());
  queryClient.removeQueries();
  localStorage.removeItem('userId');
};
