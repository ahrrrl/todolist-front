import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './TodoList.module.scss';
import TodoItem from '../../components/TodoItem';
import {
  useTodoList,
  useAddTodo,
  useToggleTodo,
  useDeleteTodo,
} from '../../hook/useTodoList';
import { useQueryClient } from '@tanstack/react-query';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: todos, isLoading, isError } = useTodoList();
  const addTodoMutation = useAddTodo();
  const toggleTodoMutation = useToggleTodo();
  const deleteTodoMutation = useDeleteTodo();

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault(); // 폼의 기본 제출 동작을 막음
    if (newTodo.trim() === '') return; // 새로운 할 일이 비어있지 않은지 확인
    addTodoMutation.mutate(newTodo, {
      onSuccess: () => {
        setNewTodo('');
      },
    });
  };

  const handleToggleTodo = (id: string) => {
    toggleTodoMutation.mutate(id);
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodoMutation.mutate(id);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    queryClient.removeQueries({ queryKey: ['user'] });
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div>(로딩중) 무료 서버를 이용하여 첫 로딩이 매우 느릴 수 있습니다!</div>
    );
  }

  return (
    <div className={styles.page_container}>
      {isError ? (
        <div className={styles.link_container}>
          <Link to='/login'>로그인 후 이용해주세요.</Link>
          <Link to='/register'>회원가입 하기</Link>
        </div>
      ) : (
        <div className={styles.todo_container}>
          <h1 className={styles.title}>할 일 목록</h1>
          <button className={styles.logout_button} onClick={handleLogout}>
            로그아웃
          </button>
          <form className={styles.input_container} onSubmit={handleAddTodo}>
            <input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder='새로운 할 일 추가'
            />
            <button type='submit'>추가</button>
          </form>
          {todos && todos.length === 0 ? (
            <p className={styles.empty_message}>할 일이 없습니다.</p>
          ) : (
            <div>
              {todos &&
                todos.map((todo) => (
                  <TodoItem
                    key={todo._id}
                    todo={todo}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                  />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoList;
