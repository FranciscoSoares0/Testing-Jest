import { Component, inject, OnInit } from '@angular/core';
import { TodoListStateServiceService } from '../../services/todo-list-state-service.service';
import { TodoListApiServiceService } from '../../services/todo-list-api-service.service';
import { TodoDumbComponentComponent } from '../todo-dumb-component/todo-dumb-component.component';
import { CommonModule } from '@angular/common';
import { AddTodoDumbComponentComponent } from '../add-todo-dumb-component/add-todo-dumb-component.component';

@Component({
  selector: 'app-todo-smart-component',
  imports: [TodoDumbComponentComponent, AddTodoDumbComponentComponent, CommonModule],
  templateUrl: './todo-smart-component.component.html',
  styleUrl: './todo-smart-component.component.css',
})
export class TodoSmartComponentComponent implements OnInit {
  private readonly todoListApiService = inject(TodoListApiServiceService);
  private readonly todoListStateService = inject(TodoListStateServiceService);

  todosSig = this.todoListStateService.todosSig;

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
        this.todoListStateService.deleteTodo(todoId);
      },
      error: (error) => {
        console.error('Error deleting todo:', error);
      },
    });
  }
}
