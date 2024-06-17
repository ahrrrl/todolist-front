import axios from 'axios';

const API_URL = 'https://todolist-back-454q.onrender.com/api';

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
  const response = await axios.post(`${API_URL}/login`, values);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const fetchUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  const response = await axios.get(`${API_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

interface SingUpValues {
  username: string;
  password: string;
}

export const signUp = async (values: SingUpValues) => {
  const { username, password } = values;
  await axios.post(`${API_URL}/login/register`, {
    username,
    password,
  });
};
