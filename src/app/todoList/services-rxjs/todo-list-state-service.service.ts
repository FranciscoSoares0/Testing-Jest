import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../interfaces/todo';
import { GetTodoResponse } from '../interfaces/get-todo-response';

@Injectable({
  providedIn: 'root',
})
export class TodoListStateServiceService {
  todos$ = new BehaviorSubject<Todo[]>([]);

  setTodos(todosResponse: GetTodoResponse) {
    this.todos$.next(todosResponse.todos);
  }

  addTodo(todo: Todo): void {
    this.todos$.next([...this.todos$.getValue(), todo]);
  }

  updateTodo(updatedTodo: Todo): void {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      return todo.id === updatedTodo.id ? updatedTodo : todo;
    });
    this.todos$.next(updatedTodos);
  }

  removeTodo(todoId: number): void {
    const updatedTodos = this.todos$
      .getValue()
      .filter((todo) => todo.id !== todoId);
    this.todos$.next(updatedTodos);
  }
}
