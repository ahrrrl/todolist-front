import React from 'react';
import styles from './TodoItem.module.scss';

interface Todo {
  completed: boolean;
  text: string;
  userId: string;
  _id: string;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={styles.item_container}>
      <input
        className={styles.checkbox_input}
        type='checkbox'
        checked={todo.completed}
        onChange={() => onToggle(todo._id)}
      />
      <span className={styles.todo_text}>{todo.text}</span>
      <button
        className={styles.delete_button}
        onClick={() => onDelete(todo._id)}
      >
        삭제
      </button>
    </div>
  );
};

export default TodoItem;
