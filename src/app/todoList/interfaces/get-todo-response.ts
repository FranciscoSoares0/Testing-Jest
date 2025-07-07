import { Todo } from "./todo";

export interface GetTodoResponse {
    limit: number;
    skip: number;
    todos: Todo[];
    total: number;
}
