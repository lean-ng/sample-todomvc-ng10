import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  async getTodos(): Promise<Todo[]> {
    return JSON.parse(localStorage.getItem('todos') || '[]');
  }

  async createTodo(title: string): Promise<Todo> {
    const todos = await this.getTodos();
    const id = await this.generateId();
    const todo: Todo = { id, title, completed: false };
    localStorage.setItem('todos', JSON.stringify(
      [...todos, todo]
    ));
    return todo;
  }

  async updateTodo(id: number, changes: Partial<Todo>): Promise<Todo> {
    const todos = await this.getTodos();
    const todo = todos.find(t => t.id === id) as Todo;
    const updatedTodo = { ...todo, ...changes, id };
    localStorage.setItem('todos', JSON.stringify(
      todos.map(t => t.id !== id ? t : updatedTodo)
    ));
    return updatedTodo;
  }

  async removeTodo(id: number): Promise<void> {
    const todos = await this.getTodos();
    localStorage.setItem('todos', JSON.stringify(
      todos.filter(t => t.id !== id)
    ));
  }

  private async generateId(): Promise<number> {
    const nextId = JSON.parse(localStorage.getItem('lastId') || '0') + 1;
    localStorage.setItem('lastId', nextId);
    return nextId;
  }
}
