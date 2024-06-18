import apiClient from '../axios/instance';

export interface LoginFormValues {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
}

export const loginUser = async (
  values: LoginFormValues
): Promise<LoginResponse> => {
  const response = await apiClient.post(`/login`, values);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const fetchUser = async () => {
  const response = await apiClient.get(`/user`);
  return response.data;
};

interface SingUpValues {
  username: string;
  password: string;
}

export const signUp = async (values: SingUpValues) => {
  const { username, password } = values;
  await apiClient.post(`/login/register`, {
    username,
    password,
  });
};
