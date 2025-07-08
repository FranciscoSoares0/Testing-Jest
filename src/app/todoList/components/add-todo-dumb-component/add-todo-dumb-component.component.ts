import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-add-todo-dumb-component',
  imports: [],
  templateUrl: './add-todo-dumb-component.component.html',
  styleUrl: './add-todo-dumb-component.component.css',
})
export class AddTodoDumbComponentComponent {
  title = signal<string>('');

  submitTitle = output<string>();

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.title.set(input.value);
  }

  addTodo(event: Event) {
    event.preventDefault();
    const value = this.title().trim();

    if (value) {
      this.submitTitle.emit(value);
      this.title.set('');
    }
  }
}
