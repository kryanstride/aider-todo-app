import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import TodoList from '../components/TodoList';

jest.mock('axios');

describe('TodoList Component', () => {
  test('loads and displays todos', async () => {
    axios.get.mockResolvedValueOnce({
      data: { data: [{ id: 1, text: 'Test Todo', completed: false }] }
    });
    render(<TodoList />);
    await waitFor(() => screen.getByText('Test Todo'));
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  test('adds a new todo', async () => {
    const todoText = 'New Todo';
    axios.post.mockResolvedValueOnce({
      data: { id: 2 }
    });
    axios.get.mockResolvedValueOnce({
      data: { data: [] }
    });
    render(<TodoList />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: todoText } });
    fireEvent.click(screen.getByText('Add Todo'));
    await waitFor(() => expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/todos', { text: todoText }));
  });
});
