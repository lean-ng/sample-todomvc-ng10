import { TestBed } from '@angular/core/testing';

import { PersistenceService } from './persistence.service';

describe('PersistenceService', () => {
  let service: PersistenceService;

  beforeEach(() => {
    localStorage.clear();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initially zero todos', (done) => {
    service.getTodos().then(todos => {
      expect(todos.length).toBe(0);
      done();
    });
  });

  it('should be able to create todos', async () => {
    const todo = await service.createTodo('Unit Tests');
    expect(todo).toEqual({ id: 1, title: 'Unit Tests', completed: false});
  });

  it('should return a persisted list', async () => {
    await service.createTodo('Todo 1');
    await service.createTodo('Todo 2');

    const todos = await service.getTodos();
    expect(todos.length).toBe(2);
  });

  it('should be able to update todos', async () => {
    await service.createTodo('Todo 1');
    await service.createTodo('Todo 3');

    const updated1 = await service.updateTodo(1, { completed: true });
    const updated2 = await service.updateTodo(2, { title: 'Todo 2'});

    expect(updated1).toEqual({ id: 1, title: 'Todo 1', completed: true});
    expect(updated2).toEqual({ id: 2, title: 'Todo 2', completed: false});

    const todos = await service.getTodos();
    expect(todos[0]).toEqual(updated1);
    expect(todos[1]).toEqual(updated2);
  });

  it('should be able to remove todos', async () => {
    await service.createTodo('Todo 1');
    await service.createTodo('Todo 2');

    await service.removeTodo(1);
    const todos = await service.getTodos();

    expect(todos.length).toBe(1);
    expect(todos[0]).toEqual({ id: 2, title: 'Todo 2', completed: false});
  });
});
