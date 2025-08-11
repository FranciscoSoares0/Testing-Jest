import { Injectable, signal } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { GetTodoResponse } from '../interfaces/get-todo-response';

@Injectable({
  providedIn: 'root'
})
export class TodoListStateServiceService {

  readonly todosSig = signal<Todo[]>([]);

  setTodos(todosResponse: GetTodoResponse) {
    this.todosSig.set(todosResponse.todos);
  }

  addTodo(todo: Todo) {
    this.todosSig.update(currentTodos => [...currentTodos, todo]);
  }

  completeTodo(todoId: number, completed: boolean) {
    this.todosSig.update(currentTodos => 
      currentTodos.map(todo => todo.id === todoId ? { ...todo, completed } : todo)
    );
  }

  deleteTodo(todoId: number) {
    this.todosSig.update(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
  }

}
