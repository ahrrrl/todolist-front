import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import { Link } from 'react-router-dom';

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  console.log(todos);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('토큰 작동');
      axios
        .get('https://todolist-back-454q.onrender.com/api/todos', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setTodos(response.data);
          setAuthenticated(true);
        })
        .catch(() => {
          setAuthenticated(false);
        });
    } else {
      setAuthenticated(false);
    }
  }, []);

  const addTodo = () => {
    const token = localStorage.getItem('token');
    axios
      .post(
        'https://todolist-back-454q.onrender.com/api/todos',
        { text: newTodo },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo('');
      });
  };

  const toggleTodo = (id: string) => {
    const token = localStorage.getItem('token');
    axios
      .patch(
        `https://todolist-back-454q.onrender.com/api/todos/${id}/toggle`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      });
  };

  const deleteTodo = (id: string) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`https://todolist-back-454q.onrender.com/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      });
  };

  if (!authenticated) {
    return (
      <div>
        <Link to='/login'>
          <p>로그인 후 이용해주세요.</p>
        </Link>
        <Link to='/register'>
          <p>회원가입 하기</p>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>할 일 목록</h1>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder='새로운 할 일 추가'
      />
      <button onClick={addTodo}>추가</button>
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
