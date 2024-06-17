import axios from 'axios';
import apiClient from '../axios/instance';

const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` };

interface TodoListResponse {
  completed: boolean;
  text: string;
  userId: string;
  _id: string;
}

export const getTodoList = async (): Promise<TodoListResponse[]> => {
  const response = await apiClient.get('/todos');
  return response.data;
};

export const addTodo = async (text: string) => {
  if (token) {
    const response = await axios.post(
      'https://todolist-back-454q.onrender.com/api/todos',
      { text },
      {
        headers,
      }
    );
    return response.data;
  }
};

export const toggleTodo = async (id: string) => {
  if (token) {
    const response = await axios.patch(
      `https://todolist-back-454q.onrender.com/api/todos/${id}/toggle`,
      {},
      {
        headers,
      }
    );
    return response.data;
  }
};

export const deleteTodo = async (id: string) => {
  if (token) {
    await axios.delete(
      `https://todolist-back-454q.onrender.com/api/todos/${id}`,
      {
        headers,
      }
    );
  }
};
