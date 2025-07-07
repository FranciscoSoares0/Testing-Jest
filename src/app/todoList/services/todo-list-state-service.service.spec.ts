import { TestBed } from '@angular/core/testing';

import { TodoListStateServiceService } from './todo-list-state-service.service';

describe('TodoListStateServiceService', () => {
  let service: TodoListStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoListStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
