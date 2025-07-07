import { TestBed } from '@angular/core/testing';

import { TodoListApiServiceService } from './todo-list-api-service.service';
import { provideHttpClient } from '@angular/common/http';

describe('TodoListApiServiceService', () => {
  let service: TodoListApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(TodoListApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
