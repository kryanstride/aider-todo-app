import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get('http://localhost:3001/todos');
      setTodos(response.data.data);
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    const response = await axios.post('http://localhost:3001/todos', { text: newTodo });
    setTodos([...todos, { id: response.data.id, text: newTodo, completed: false }]);
    setNewTodo('');
  };

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
