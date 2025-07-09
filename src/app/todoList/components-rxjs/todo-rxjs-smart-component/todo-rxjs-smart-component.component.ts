import { Component, inject, OnInit } from '@angular/core';
import { TodoListApiServiceService } from '../../services/todo-list-api-service.service';
import { TodoListStateServiceService } from '../../services-rxjs/todo-list-state-service.service';
import { TodoRxjsDumbComponentComponent } from '../todo-rxjs-dumb-component/todo-rxjs-dumb-component.component';
import { CommonModule } from '@angular/common';
import { AddTodoDumbComponentComponent } from '../../components/add-todo-dumb-component/add-todo-dumb-component.component';

@Component({
  selector: 'app-todo-rxjs-smart-component',
  imports: [CommonModule, TodoRxjsDumbComponentComponent, AddTodoDumbComponentComponent],
  templateUrl: './todo-rxjs-smart-component.component.html',
  styleUrl: './todo-rxjs-smart-component.component.css'
})
export class TodoRxjsSmartComponentComponent implements OnInit {

  private readonly todoListApiService = inject(TodoListApiServiceService);
  private readonly todoListStateService = inject(TodoListStateServiceService);

  todos$ = this.todoListStateService.todos$;

  ngOnInit(): void {
    this.todoListApiService.getTodos().subscribe({
      next: (todos) => {
        console.log('Fetched todos:', todos);
        this.todoListStateService.setTodos(todos);
      },
      error: (error) => {
        console.error('Error fetching todos:', error);
      },
    });
  }

  onAddTodo(title: string) {
    const newTodo = {
      todo: title,
      completed: false,
      userId: 1
    }
    this.todoListApiService.addTodo(newTodo).subscribe({
      next: (addedTodo) => {
        console.log('Added todo:', addedTodo);
        this.todoListStateService.addTodo(addedTodo);
      },
      error: (error) => {
        console.error('Error adding todo:', error);
      },
    });
  }

  onDeleteTodo(todoId: number) {
    this.todoListApiService.deleteTodo(todoId).subscribe({
      next: (deletedTodo) => {
        console.log('Deleted todo:', deletedTodo);
        this.todoListStateService.removeTodo(todoId);
      },
      error: (error) => {
        console.error('Error deleting todo:', error);
      },
    });
  }
}
