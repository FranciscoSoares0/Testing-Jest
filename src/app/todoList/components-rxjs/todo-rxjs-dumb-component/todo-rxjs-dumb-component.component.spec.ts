import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoRxjsDumbComponentComponent } from './todo-rxjs-dumb-component.component';

describe('TodoRxjsDumbComponentComponent', () => {
  let component: TodoRxjsDumbComponentComponent;
  let fixture: ComponentFixture<TodoRxjsDumbComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoRxjsDumbComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoRxjsDumbComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
