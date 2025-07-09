import { Routes } from '@angular/router';
import { TodoRxjsSmartComponentComponent } from './todoList/components-rxjs/todo-rxjs-smart-component/todo-rxjs-smart-component.component';
import { TodoSmartComponentComponent } from './todoList/components/todo-smart-component/todo-smart-component.component';

export const routes: Routes = [
    { path: '', component: TodoSmartComponentComponent}, // Redirect root to 'home' or another default
    { path: 'rxjs', component: TodoRxjsSmartComponentComponent },
];
