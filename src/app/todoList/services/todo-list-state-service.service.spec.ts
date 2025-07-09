import { TestBed } from '@angular/core/testing';

import { TodoListStateServiceService } from './todo-list-state-service.service';
import { Todo } from '../interfaces/todo';
import { GetTodoResponse } from '../interfaces/get-todo-response';

describe('TodoListStateServiceService', () => {
  let service: TodoListStateServiceService;

  const mockTodos: Todo[] = [
    { id: 1, todo: 'Test Todo 1', completed: false, userId: 1 },
    { id: 2, todo: 'Test Todo 2', completed: true, userId: 1 }, 
  ];

  const mockResponse: GetTodoResponse = {
    todos: mockTodos,
    total: mockTodos.length,
    skip: 1,
    limit: 10,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoListStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set todos using setTodos()', () => {
    service.setTodos(mockResponse);
    expect(service.todosSig()).toEqual(mockTodos);
  });

  it('should add a todo using addTodo()', () => {
    service.setTodos(mockResponse);
    const newTodo: Todo = { id: 3, todo: 'New Todo', completed: false, userId: 1 };
    service.addTodo(newTodo);
    const currentTodos = service.todosSig();
    expect(currentTodos.length).toBe(3);
    expect(currentTodos[2]).toEqual(newTodo);
  });

  it('should update a todo using updateTodo()', () => {
    service.setTodos(mockResponse);
    const updatedTodo: Todo = { id: 1, todo: 'Updated Todo 1', completed: true, userId: 1 };
    service.updateTodo(updatedTodo);
    const currentTodos = service.todosSig();
    expect(currentTodos.length).toBe(2);
    expect(currentTodos[0]).toEqual(updatedTodo);
  });

  it('should delete a todo by id using deleteTodo()', () => {
    service.setTodos(mockResponse);
    service.deleteTodo(1);
    const currentTodos = service.todosSig();
    expect(currentTodos.length).toBe(1);
    expect(currentTodos[0].id).toBe(2);
  });

  it('should not throw if deleting a non-existing id', () => {
    service.setTodos(mockResponse);
    expect(() => service.deleteTodo(999)).not.toThrow();
    expect(service.todosSig().length).toBe(2);
  });
});
