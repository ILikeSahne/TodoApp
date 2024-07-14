import React from 'react';
import {render} from '@testing-library/react-native';
import TodoList from '../../src/components/todolist/TodoList';
import {MenuProvider} from 'react-native-popup-menu';
import TodoListDto from '../../src/api/todolist/models/TodoListDto';

describe('TodoList Component', () => {
  const initialTodoList: TodoListDto = {
    name: 'My Todo List',
    createdByUser: 'User',
    todos: [
      {name: 'Todo 1', completed: false, addedDate: new Date()},
      {name: 'Todo 2', completed: true, addedDate: new Date()},
    ],
  };

  const mockTodoListChanged = jest.fn();

  it('renders the todos correctly', () => {
    const {getByText} = render(
      <MenuProvider>
        <TodoList
          todoList={initialTodoList}
          todoListChanged={mockTodoListChanged}
        />
      </MenuProvider>,
    );

    expect(getByText('Todo 1')).toBeTruthy();
    expect(getByText('Todo 2')).toBeTruthy();
  });
});
