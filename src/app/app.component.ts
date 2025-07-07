import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoSmartComponentComponent } from './todoList/components/todo-smart-component/todo-smart-component.component';

@Component({
  selector: 'app-root',
  imports: [TodoSmartComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'testing-app';
}
