import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetTodoResponse } from '../interfaces/get-todo-response';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoListApiServiceService {

  private readonly http = inject(HttpClient);

  getTodos(): Observable<GetTodoResponse> {
    return this.http.get<GetTodoResponse>(`https://dummyjson.com/todos`);
  }

  deleteTodo(todoId : number): Observable<Todo> {
    return this.http.delete<Todo>(`https://dummyjson.com/todos/${todoId}`);
  }
}
