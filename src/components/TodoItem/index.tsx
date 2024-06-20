import React, { useEffect, useRef, useState } from 'react';
import styles from './TodoItem.module.scss';
import { useEditTodo } from '../../hook/useTodoList';

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
  const [newText, setNewText] = useState(todo.text);
  const [isEditing, setIsEditing] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const editTodoMutation = useEditTodo();

  const handleEditTodo = (id: string, newText: string) => {
    editTodoMutation.mutate({ id, text: newText });
    setIsEditing(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.item_container} ref={itemRef}>
      <input
        className={styles.checkbox_input}
        type='checkbox'
        checked={todo.completed}
        onChange={() => onToggle(todo._id)}
      />

      {isEditing ? (
        <input
          className={styles.edit_input}
          type='text'
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <span className={styles.todo_text}>{todo.text}</span>
      )}

      <div className={styles.button_container}>
        {isEditing ? (
          <button
            className={styles.edit_button}
            onClick={() => handleEditTodo(todo._id, newText)}
          >
            확인
          </button>
        ) : (
          <button
            className={styles.edit_button}
            onClick={() => setIsEditing(true)}
          >
            수정
          </button>
        )}
        <button
          className={styles.delete_button}
          onClick={() => onDelete(todo._id)}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
