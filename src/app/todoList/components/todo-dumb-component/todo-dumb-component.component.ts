import { Component, input, output } from '@angular/core';
import { Todo } from '../../interfaces/todo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-dumb-component',
  imports: [CommonModule],
  templateUrl: './todo-dumb-component.component.html',
  styleUrl: './todo-dumb-component.component.css'
})
export class TodoDumbComponentComponent {

  todos = input<Todo[]>([]);

  deleteTodo = output<number>();
}
