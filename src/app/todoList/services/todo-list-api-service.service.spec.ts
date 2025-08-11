import { TestBed } from '@angular/core/testing';

import { TodoListApiServiceService } from './todo-list-api-service.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('TodoListApiServiceService', () => {
  let service: TodoListApiServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    });
    service = TestBed.inject(TodoListApiServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTodos', () => {
    it('should make GET request to fetch todos', () => {
      const mockTodos = {
        todos: [
          { id: 1, todo: 'Test Todo 1', completed: false, userId: 1 },
          { id: 2, todo: 'Test Todo 2', completed: true, userId: 1 }
        ],
        total: 2,
        skip: 0,
        limit: 10
      };

      service.getTodos().subscribe(todos => {
        expect(todos).toEqual(mockTodos);
      });

      const req = httpMock.expectOne('https://dummyjson.com/todos');
      expect(req.request.method).toBe('GET');
      req.flush(mockTodos);
    });

    it('should handle error response', () => {
      const errorMessage = 'Error fetching todos';
      service.getTodos().subscribe(
        () => fail('Expected error was not received'),
        (error) => expect(error.message).toContain(errorMessage)
      );

      const req = httpMock.expectOne('https://dummyjson.com/todos');
      req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('addTodo', () => {
    it('should make POST request to add todo', () => {
      const newTodo = { todo: 'New Todo', completed: false, userId: 1 };
      const mockResponse = { id: 1, ...newTodo };

      service.addTodo(newTodo).subscribe(todo => {
        expect(todo).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('https://dummyjson.com/todos/add');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newTodo);
      req.flush(mockResponse);
    });

    it('should handle error response', () => {
      const newTodo = { todo: 'New Todo', completed: false, userId: 1 };
      const errorMessage = 'Error adding todo';

      service.addTodo(newTodo).subscribe(
        () => fail('Expected error was not received'),
        (error) => expect(error.message).toContain(errorMessage)
      );

      const req = httpMock.expectOne('https://dummyjson.com/todos/add');
      req.flush(errorMessage, { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('completeTodo', () => {
    it('should make PUT request to complete todo', () => {
      const todoId = 1;
      const mockResponse = { id: todoId, todo: 'Test Todo', completed: true, userId: 1 };

      service.completeTodo(todoId, true).subscribe(todo => {
        expect(todo).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`https://dummyjson.com/todos/${todoId}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({ completed: true });
      req.flush(mockResponse);
    });

    it('should handle error response', () => {
      const todoId = 1;
      const errorMessage = 'Error completing todo';

      service.completeTodo(todoId, true).subscribe(
        () => fail('Expected error was not received'),
        (error) => expect(error.message).toContain(errorMessage)
      );

      const req = httpMock.expectOne(`https://dummyjson.com/todos/${todoId}`);
      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });

    it('should handle invalid todo ID', () => {
      const invalidId = -1;
      const errorMessage = 'Invalid todo ID';

      service.completeTodo(invalidId, true).subscribe(
        () => fail('Expected error was not received'),
        (error) => expect(error.message).toContain(errorMessage)
      );

      const req = httpMock.expectOne(`https://dummyjson.com/todos/${invalidId}`);
      req.flush(errorMessage, { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('deleteTodo', () => {
    it('should make DELETE request to remove todo', () => {
      const todoId = 1;
      const mockResponse = { id: todoId, todo: 'Deleted Todo', completed: false, userId: 1 };

      service.deleteTodo(todoId).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`https://dummyjson.com/todos/${todoId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockResponse);
    });

    it('should handle error response', () => {
      const todoId = 1;
      const errorMessage = 'Error deleting todo';

      service.deleteTodo(todoId).subscribe(
        () => fail('Expected error was not received'),
        (error) => expect(error.message).toContain(errorMessage)
      );

      const req = httpMock.expectOne(`https://dummyjson.com/todos/${todoId}`);
      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });
  });
});
