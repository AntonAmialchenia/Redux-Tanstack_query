import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../shared/redux';
import { authSlice } from './authSlice';
import { authApi } from './api';

export const useUser = () => {
  const userId = useAppSelector(authSlice.selectors.getUserId);
  return useQuery({
    ...authApi.getUserById(userId!),
    enabled: Boolean(userId),
  });
};
