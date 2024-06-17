import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getTodoList,
  addTodo as addTodoApi,
  toggleTodo as toggleTodoApi,
  deleteTodo as deleteTodoApi,
} from '../api/todos';

export const useTodoList = () => {
  return useQuery({ queryKey: ['todolist'], queryFn: getTodoList });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todolist'] });
    },
  });
};

export const useToggleTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todolist'] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todolist'] });
    },
  });
};
