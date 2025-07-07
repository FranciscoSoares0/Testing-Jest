import { Component, input, output } from '@angular/core';
import { Todo } from '../../interfaces/todo';
import { CommonModule } from '@angular/common';
import { HighlightDirectiveDirective } from '../../directives/highlight-directive.directive';

@Component({
  selector: 'app-todo-dumb-component',
  imports: [CommonModule, HighlightDirectiveDirective],
  templateUrl: './todo-dumb-component.component.html',
  styleUrl: './todo-dumb-component.component.css',
})
export class TodoDumbComponentComponent {

  todos = input<Todo[]>([]);

  deleteTodo = output<number>();
}
