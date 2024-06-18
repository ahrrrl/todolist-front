import apiClient from '../axios/instance';

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
  const response = await apiClient.post('/todos', { text });
  return response.data;
};

export const toggleTodo = async (id: string) => {
  const response = await apiClient.patch(`todos/${id}/toggle`);
  return response.data;
};

export const deleteTodo = async (id: string) => {
  await apiClient.delete(`/todos/${id}`);
};
