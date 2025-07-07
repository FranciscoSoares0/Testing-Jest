import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDumbComponentComponent } from './todo-dumb-component.component';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';
import { Todo } from '../../interfaces/todo';

describe('TodoDumbComponentComponent', () => {
  let component: TodoDumbComponentComponent;
  let fixture: ComponentFixture<TodoDumbComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoDumbComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoDumbComponentComponent);
    fixture.componentRef.setInput('todos', signal<Todo[]>([]));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('input: todos', () => {
    it('should render empty message when todos is empty', () => {
      fixture.componentRef.setInput('todos', signal<Todo[]>([]));

      fixture.detectChanges();

      const emptyMessage = fixture.debugElement.query(
        By.css('[data-testid="no-todos-message"]')
      );
      expect(emptyMessage).toBeTruthy();
    });

    it('should render todos label', () => {
      const testData: Todo[] = [{ id: 1, todo: 'Test Todo', completed: false, userId:1 }];
      fixture.componentRef.setInput('todos', testData);

      fixture.detectChanges();

      const emptyMessage = fixture.debugElement.query(
        By.css('[data-testid="todos-header"]')
      );
      expect(emptyMessage).toBeTruthy();
    });
  });

  describe('output: deleteTodo', () => {
    it('should emit deleteTodo event with todo id when delete button is clicked', () => {
      const testData: Todo[] = [{ id: 1, todo: 'Test Todo', completed: false, userId:1 }];
      fixture.componentRef.setInput('todos', testData);

      fixture.detectChanges();

      const emitSpy = jest.spyOn(component.deleteTodo, 'emit');

      const deleteButtons = fixture.debugElement.queryAll(
        By.css('[data-testid="delete-todo"]')
      );
      expect(deleteButtons.length).toBe(1);
      deleteButtons[0].triggerEventHandler('click', null);

      expect(emitSpy).toHaveBeenCalledWith(1);
    });
  }
  );

});
