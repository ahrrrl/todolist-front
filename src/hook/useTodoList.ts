import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getTodoList,
  addTodo as addTodoApi,
  toggleTodo as toggleTodoApi,
  deleteTodo as deleteTodoApi,
  editTodo as editTodoApi,
} from '../api/todos';

export const useTodoList = () => {
  return useQuery({
    queryKey: ['user', 'todolist'],
    queryFn: getTodoList,
    retry: false,
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'todolist'] });
    },
  });
};

export const useToggleTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'todolist'] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'todolist'] });
    },
  });
};

export const useEditTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'todolist'] });
    },
  });
};
