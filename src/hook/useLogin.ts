import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginFormValues, LoginResponse, loginUser } from '../api/auth';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, unknown, LoginFormValues, unknown>({
    mutationFn: loginUser,
    onSuccess: (data: LoginResponse) => {
      queryClient.setQueryData(['user'], {
        username: data.username,
      });
    },
  });
};
