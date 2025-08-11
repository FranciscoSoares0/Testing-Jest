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

    it('should render todos label when todos exist', () => {
      const testData: Todo[] = [{ id: 1, todo: 'Test Todo', completed: false, userId: 1 }];
      fixture.componentRef.setInput('todos', testData);

      fixture.detectChanges();

      const header = fixture.debugElement.query(
        By.css('[data-testid="todos-header"]')
      );
      expect(header).toBeTruthy();
      expect(header.nativeElement.textContent).toContain('Todos');
    });

    it('should render list of todos', () => {
      const testData: Todo[] = [
        { id: 1, todo: 'Todo 1', completed: false, userId: 1 },
        { id: 2, todo: 'Todo 2', completed: true, userId: 1 }
      ];
      fixture.componentRef.setInput('todos', testData);

      fixture.detectChanges();

      const todoItems = fixture.debugElement.queryAll(By.css('li'));
      expect(todoItems.length).toBe(2);
      
      todoItems.forEach((item, index) => {
        expect(item.nativeElement.textContent).toContain(testData[index].todo);
      });
    });

    it('should render completion status indicator', () => {
      const testData: Todo[] = [
        { id: 1, todo: 'Todo 1', completed: true, userId: 1 },
        { id: 2, todo: 'Todo 2', completed: false, userId: 1 }
      ];
      fixture.componentRef.setInput('todos', testData);

      fixture.detectChanges();

      const todoItems = fixture.debugElement.queryAll(By.css('li'));
      expect(todoItems[0].query(By.css('span'))).toBeTruthy();
      expect(todoItems[0].query(By.css('span')).nativeElement.textContent).toContain('✅');
      expect(todoItems[1].query(By.css('span'))).toBeFalsy();
    });
  });

  describe('output: deleteTodo', () => {
    it('should emit deleteTodo event with todo id when delete button is clicked', () => {
      const testData: Todo[] = [{ id: 1, todo: 'Test Todo', completed: false, userId: 1 }];
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

    it('should not emit deleteTodo event when clicking outside delete button', () => {
      const testData: Todo[] = [{ id: 1, todo: 'Test Todo', completed: false, userId: 1 }];
      fixture.componentRef.setInput('todos', testData);

      fixture.detectChanges();

      const emitSpy = jest.spyOn(component.deleteTodo, 'emit');

      const todoItem = fixture.debugElement.query(By.css('li'));
      todoItem.triggerEventHandler('click', null);

      expect(emitSpy).not.toHaveBeenCalled();
    });
  });

  describe('output: completeTodo', () => {
    it('should emit completeTodo event with todo id when complete button is clicked', () => {
      const testData: Todo[] = [{ id: 1, todo: 'Test Todo', completed: false, userId: 1 }];
      fixture.componentRef.setInput('todos', testData);

      fixture.detectChanges();

      const emitSpy = jest.spyOn(component.completeTodo, 'emit');

      const completeButtons = fixture.debugElement.queryAll(
        By.css('[data-testid="complete-todo"]')
      );
      expect(completeButtons.length).toBe(1);
      completeButtons[0].triggerEventHandler('click', null);

      expect(emitSpy).toHaveBeenCalledWith(1);
    });

    it('should toggle complete button text between "Complete Task" and "Undo Task"', () => {
      const testData: Todo[] = [
        { id: 1, todo: 'Test Todo 1', completed: false, userId: 1 },
        { id: 2, todo: 'Test Todo 2', completed: true, userId: 1 }
      ];
      fixture.componentRef.setInput('todos', testData);

      fixture.detectChanges();

      const completeButtons = fixture.debugElement.queryAll(By.css('[data-testid="complete-todo"]'));
      expect(completeButtons.length).toBe(2);

      // First todo is incomplete, should show "Complete Task"
      expect(completeButtons[0].nativeElement.textContent).toContain('Complete Task');

      // Second todo is complete, should show "Undo Task"
      expect(completeButtons[1].nativeElement.textContent).toContain('Undo Task');
    });
  });

  describe('UI rendering', () => {
    it('should apply highlight directive to todos header', () => {
      const testData: Todo[] = [{ id: 1, todo: 'Test Todo', completed: false, userId: 1 }];
      fixture.componentRef.setInput('todos', testData);

      fixture.detectChanges();

      const header = fixture.debugElement.query(By.css('h3'));
      expect(header.attributes['appHighlightDirective']).toBeTruthy();
      expect(header.attributes['highlightColor']).toBe('green');
    });

    it('should render delete buttons with correct styling', () => {
      const testData: Todo[] = [{ id: 1, todo: 'Test Todo', completed: false, userId: 1 }];
      fixture.componentRef.setInput('todos', testData);

      fixture.detectChanges();

      const deleteButton = fixture.debugElement.query(By.css('[data-testid="delete-todo"]'));
      const style = window.getComputedStyle(deleteButton.nativeElement);
      expect(style.cursor).toBe('pointer');
      expect(style.color).toBe('rgb(255, 0, 0)'); // red color
    });

    it('should render complete buttons with correct styling', () => {
      const testData: Todo[] = [{ id: 1, todo: 'Test Todo', completed: false, userId: 1 }];
      fixture.componentRef.setInput('todos', testData);

      fixture.detectChanges();

      const completeButton = fixture.debugElement.query(By.css('[data-testid="complete-todo"]'));
      const style = window.getComputedStyle(completeButton.nativeElement);
      expect(style.cursor).toBe('pointer');
      expect(style.color).toBe('rgb(0, 0, 255)'); // blue color
    });
  });
});
