import React from 'react';

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div>
      <input
        type='checkbox'
        checked={todo.completed}
        onChange={() => onToggle(todo._id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo._id)}>삭제</button>
    </div>
  );
};

export default TodoItem;
