import { TestBed } from '@angular/core/testing';

import { TodoListStateServiceService } from './todo-list-state-service.service';
import { Todo } from '../interfaces/todo';

describe('TodoListStateServiceService', () => {
  let todosService: TodoListStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoListStateServiceService]
    });
    todosService = TestBed.inject(TodoListStateServiceService);
  });

  it('should be created', () => {
    expect(todosService).toBeTruthy();
  });

  describe('set todos', () => {
    it('should set todos', () => {
      const mockTodos: Todo[] = [
        { id: 1, todo: 'Test Todo 1', completed: false, userId: 1 },
        { id: 2, todo: 'Test Todo 2', completed: true, userId: 1 },
      ];
      todosService.setTodos({ todos: mockTodos, total: mockTodos.length, skip: 0, limit: 10 });

      const currentTodos = todosService.todos$.getValue();
      expect(currentTodos.length).toBe(2);
      expect(currentTodos).toEqual(mockTodos);
    });
  });

  describe('add todo',() => {
    it('should add a todo', () => {
      const newTodo: Todo = { id: 1, todo: 'Test Todo 1', completed: false, userId: 1 };
      todosService.addTodo(newTodo);

      const updatedTodos = todosService.todos$.getValue();
      expect(updatedTodos.length).toBe(1);
      expect(updatedTodos[0]).toEqual(newTodo);
    });
  })

  describe('update todo', () => {
    it('should update a todo', () => {
      todosService.todos$.next([
        { id: 1, todo: 'Test Todo 1', completed: false, userId: 1 },
      ]);
      const updatedTodo: Todo = { id: 1, todo: 'Updated Todo 1', completed: true, userId: 1 };
      todosService.updateTodo(updatedTodo);

      const updatedTodos = todosService.todos$.getValue();
      expect(updatedTodos.length).toBe(1);
      expect(updatedTodos[0]).toEqual(updatedTodo);
    });
  });

  describe('remove todo',()=>{
    it('should remove a todo',() =>{
      todosService.todos$.next([
        { id: 1, todo: 'Test Todo 1', completed: false , userId: 1 },
      ]);
      todosService.removeTodo(1);

      const updatedTodos = todosService.todos$.getValue();
      expect(updatedTodos.length).toBe(0);
      expect(updatedTodos).toEqual([]);
    })
  })
});
