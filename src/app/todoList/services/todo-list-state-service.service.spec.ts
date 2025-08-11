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

  describe('completeTodo', () => {
    it('should complete an incomplete todo', () => {
      service.setTodos(mockResponse);
      const todoId = 1; // Initially incomplete todo
      service.completeTodo(todoId, true);
      const currentTodos = service.todosSig();
      expect(currentTodos[0].completed).toBe(true);
    });

    it('should undo a completed todo', () => {
      service.setTodos(mockResponse);
      const todoId = 2; // Initially completed todo
      service.completeTodo(todoId, false);
      const currentTodos = service.todosSig();
      expect(currentTodos[1].completed).toBe(false);
    });

    it('should not throw if completing a non-existing todo', () => {
      service.setTodos(mockResponse);
      expect(() => service.completeTodo(999, true)).not.toThrow();
      expect(service.todosSig().length).toBe(2);
    });

    it('should maintain other todo properties when completing', () => {
      service.setTodos(mockResponse);
      const todoId = 1;
      const originalTodo = mockTodos[0];
      service.completeTodo(todoId, true);
      const currentTodos = service.todosSig();
      
      expect(currentTodos[0].id).toBe(originalTodo.id);
      expect(currentTodos[0].todo).toBe(originalTodo.todo);
      expect(currentTodos[0].userId).toBe(originalTodo.userId);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo by id', () => {
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
});
