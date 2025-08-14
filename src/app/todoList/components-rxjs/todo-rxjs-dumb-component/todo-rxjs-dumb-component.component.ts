import { Component, input, output } from '@angular/core';
import { Todo } from '../../interfaces/todo';

@Component({
  selector: 'app-todo-rxjs-dumb-component',
  imports: [],
  templateUrl: './todo-rxjs-dumb-component.component.html',
  styleUrl: './todo-rxjs-dumb-component.component.css'
})
export class TodoRxjsDumbComponentComponent {

  todos = input<Todo[]>([]);
  
  deleteTodo = output<number>();
}
