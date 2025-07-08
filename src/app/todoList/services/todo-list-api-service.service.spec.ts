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

  it('should fetch todos', () => {
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

  it('should add a todo', () => {
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

  it('should delete a todo', () => {
    const todoId = 1;
    const mockResponse = { id: todoId, todo: 'Deleted Todo', completed: false, userId: 1 };

    service.deleteTodo(todoId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`https://dummyjson.com/todos/${todoId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
  
});
