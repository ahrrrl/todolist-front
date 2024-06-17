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

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem('token')
  );
  const navigate = useNavigate();

  const { data: todos, isLoading, isError } = useTodoList();
  const addTodoMutation = useAddTodo();
  const toggleTodoMutation = useToggleTodo();
  const deleteTodoMutation = useDeleteTodo();

  const handleAddTodo = () => {
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
    localStorage.removeItem('token');
    setAuthenticated(false);
    navigate('/login');
  };

  if (!authenticated) {
    return (
      <div className={styles.page_container}>
        <div className={styles.link_container}>
          <Link to='/login'>로그인 후 이용해주세요.</Link>
          <Link to='/register'>회원가입 하기</Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div>자료를 불러오는 중입니다!</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다. 다시 시도해주세요.</div>;
  }
  return (
    <div className={styles.page_container}>
      <div className={styles.todo_container}>
        <h1 className={styles.title}>할 일 목록</h1>
        <button className={styles.logout_button} onClick={handleLogout}>
          로그아웃
        </button>
        <div className={styles.input_container}>
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder='새로운 할 일 추가'
          />
          <button onClick={handleAddTodo}>추가</button>
        </div>
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
    </div>
  );
};

export default TodoList;
