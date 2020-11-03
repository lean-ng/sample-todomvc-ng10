import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinct, map } from 'rxjs/operators';

import { Todo } from '../models/todo';
import { PersistenceService } from '../services/persistence.service';
import { AppState } from './app-state.interface';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class AppStateService extends StateService<AppState> {

  constructor(private persistence: PersistenceService) {
    super({ todos: [] });
    persistence.getTodos().then(todos => {
      if (todos.length > 0) {
        this.setState({todos});
      }
    });
  }

  getTodos$(): Observable<Todo[]> {
    return this.getState().pipe(map( s => s.todos ), distinct());
  }

  async createTodo(title: string): Promise<void> {
    const todo = await this.persistence.createTodo(title);
    this.setState({ todos: [...this.state.todos, todo]});
  }

  async toggleTodoState(id: number): Promise<void> {
    const todo = this.state.todos.find(t => t.id === id) as Todo;
    await this.updateTodo(id, { completed: !todo.completed });
  }

  async updateTodoTitle(id: number, title: string): Promise<void> {
    const todo = this.state.todos.find(t => t.id === id) as Todo;
    await this.updateTodo(id, { title });
  }

  async updateTodo(id: number, changes: Partial<Todo>): Promise<void> {
    const updatedTodo = await this.persistence.updateTodo(id, changes);
    this.setState({ todos: this.state.todos.map(t => t.id !== id ? t : updatedTodo)});
  }

  async removeTodo(id: number): Promise<void> {
    await this.persistence.removeTodo(id);
    this.setState({ todos: this.state.todos.filter(t => t.id !== id)});
  }

  async syncAllTodoStates(completed: boolean): Promise<void> {
    await Promise.all(this.state.todos.filter(t => t.completed !== completed).map(
      t => this.updateTodo(t.id, { completed })
    ));
  }

  async removeAllCompletedTodos(): Promise<void> {
    await Promise.all(this.state.todos.filter(t => t.completed).map(
      t => this.removeTodo(t.id)
    ));
  }
}
