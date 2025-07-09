import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoRxjsSmartComponentComponent } from './todo-rxjs-smart-component.component';

describe('TodoRxjsSmartComponentComponent', () => {
  let component: TodoRxjsSmartComponentComponent;
  let fixture: ComponentFixture<TodoRxjsSmartComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoRxjsSmartComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoRxjsSmartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
