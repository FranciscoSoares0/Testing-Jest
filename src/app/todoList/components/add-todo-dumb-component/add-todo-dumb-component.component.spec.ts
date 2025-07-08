import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTodoDumbComponentComponent } from './add-todo-dumb-component.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

describe('AddTodoDumbComponentComponent', () => {
  let fixture: ComponentFixture<AddTodoDumbComponentComponent>;
  let component: AddTodoDumbComponentComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTodoDumbComponentComponent], // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(AddTodoDumbComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update title signal on input', () => {
    const input = fixture.debugElement.query(By.css('[data-testid="add-todo-input"]')).nativeElement as HTMLInputElement;
    input.value = 'Test Todo';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.title()).toBe('Test Todo');
  });

  it('should emit submitTitle with value on form submit and clear input', () => {
    const input = fixture.debugElement.query(By.css('[data-testid="add-todo-input"]')).nativeElement as HTMLInputElement;
    const form = fixture.debugElement.query(By.css('[data-testid="add-todo-form"]'));

    const emittedValues: string[] = [];
    component.submitTitle.subscribe((value) => emittedValues.push(value));

    input.value = 'New Todo';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    form.triggerEventHandler('submit', new Event('submit'));
    fixture.detectChanges();

    expect(emittedValues.length).toBe(1);
    expect(emittedValues[0]).toBe('New Todo');
    expect(component.title()).toBe(''); // cleared after submit
  });

  it('should not emit submitTitle if input is empty or whitespace', () => {
    const form = fixture.debugElement.query(By.css('[data-testid="add-todo-form"]'));

    const emittedValues: string[] = [];
    component.submitTitle.subscribe((value) => emittedValues.push(value));

    component.title.set('   ');
    fixture.detectChanges();

    form.triggerEventHandler('submit', new Event('submit'));
    fixture.detectChanges();

    expect(emittedValues.length).toBe(0);
  });
});
