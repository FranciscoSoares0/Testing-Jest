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

  describe('add todo',() => {
    it('should add a todo', () => {
      const newTodo: Todo = { id: 1, todo: 'Test Todo 1', completed: false, userId: 1 };
      todosService.addTodo(newTodo);

      const updatedTodos = todosService.todos$.getValue();
      expect(updatedTodos.length).toBe(1);
      expect(updatedTodos[0]).toEqual(newTodo);
    });
  })

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
