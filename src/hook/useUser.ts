import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../api/auth';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    retry: false,
  });
};
