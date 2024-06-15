import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/todos', {
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => {
        setTodos(response.data);
        setAuthenticated(true);
      }).catch(() => {
        setAuthenticated(false);
      });
    } else {
      setAuthenticated(false);
    }
  }, []);

  const addTodo = () => {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:5000/api/todos', { text: newTodo }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      setTodos([...todos, response.data]);
      setNewTodo('');
    });
  };

  const toggleTodo = (id: string) => {
    const token = localStorage.getItem('token');
    axios.patch(`http://localhost:5000/api/todos/${id}/toggle`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      setTodos(todos.map(todo => todo.id === id ? response.data : todo));
    });
  };

  const deleteTodo = (id: string) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:5000/api/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    });
  };

  if (!authenticated) {
    return <p>로그인 후 이용해주세요.</p>;
  }

  return (
    <div>
      <h1>할 일 목록</h1>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="새로운 할 일 추가"
      />
      <button onClick={addTodo}>추가</button>
      <div>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
