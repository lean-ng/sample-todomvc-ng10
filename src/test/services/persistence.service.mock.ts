import { Injectable } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { PersistenceService } from 'src/app/services/persistence.service';

@Injectable()
export class PersistenceServiceMock extends PersistenceService {

  todos: Todo[] = [];
  lastId = 0;

  clear(): void {
    this.todos = [];
    this.lastId = 0;
  }

  async getTodos(): Promise<Todo[]> {
    return this.todos;
  }

  async createTodo(title: string): Promise<Todo> {
    const id = ++this.lastId;
    const todo: Todo = { id, title, completed: false };
    this.todos.push(todo);
    return todo;
  }

  async updateTodo(id: number, changes: Partial<Todo>): Promise<Todo> {
    const todo = this.todos.find(t => t.id === id) as Todo;
    Object.assign(todo, changes);
    return todo;
  }

  async removeTodo(id: number): Promise<void> {
    const todoIx = this.todos.findIndex(t => t.id === id);
    this.todos.splice(todoIx, 1);
  }
}
