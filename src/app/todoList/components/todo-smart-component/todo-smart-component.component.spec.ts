import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoSmartComponentComponent } from './todo-smart-component.component';

describe('TodoSmartComponentComponent', () => {
  let component: TodoSmartComponentComponent;
  let fixture: ComponentFixture<TodoSmartComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoSmartComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoSmartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
