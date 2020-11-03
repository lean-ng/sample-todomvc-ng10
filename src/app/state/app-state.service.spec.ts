import { TestBed } from '@angular/core/testing';
import { PersistenceServiceMock } from 'src/test/services/persistence.service.mock';
import { PersistenceService } from '../services/persistence.service';
import { AppStateService } from './app-state.service';
import { zip } from 'rxjs';

describe('AppStateService', () => {
  let service: AppStateService;
  let persistenceService: PersistenceServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PersistenceService, useClass: PersistenceServiceMock }
      ]
    });
    service = TestBed.inject(AppStateService);
    persistenceService = TestBed.inject(PersistenceService) as PersistenceServiceMock;
    persistenceService.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initially zero todos', (done) => {
    service.getTodos$().subscribe(todos => {
      expect(todos.length).toBe(0);
      done();
    });
  });

  it('should persist todos', (done) => {
    spyOn(persistenceService, 'createTodo').and.callThrough();
    Promise.all([service.createTodo('Todo 1'), service.createTodo('Todo 2')])
      .then(() => {
        expect(persistenceService.createTodo).toHaveBeenCalledTimes(2);
        service.getTodos$().subscribe(todos => {
          expect(todos.length).toBe(2);
          done();
        });
      });
  });

  it('should update todos', async (done) => {
    spyOn(persistenceService, 'updateTodo').and.callThrough();
    await service.createTodo('Todo 1');
    await service.createTodo('Todo 3');

    await service.toggleTodoState(1);
    await service.updateTodoTitle(2, 'Todo 2');

    expect(persistenceService.updateTodo).toHaveBeenCalledTimes(2);
    expect(persistenceService.updateTodo).toHaveBeenCalledWith(1, { completed: true });
    expect(persistenceService.updateTodo).toHaveBeenCalledWith(2, { title: 'Todo 2' });
    service.getTodos$().subscribe(todos => {
      expect(todos[0].completed).toBeTrue();
      expect(todos[1].title).toBe('Todo 2');
      done();
    });
  });

  it('should remove todos', async (done) => {
    spyOn(persistenceService, 'removeTodo').and.callThrough();
    await service.createTodo('Todo 1');
    await service.createTodo('Todo 2');

    await service.removeTodo(1);
    expect(persistenceService.removeTodo).toHaveBeenCalledWith(1);
    service.getTodos$().subscribe(todos => {
      expect(todos.length).toBe(1);
      done();
    });
  });

  it('should remove all completed todos', async (done) => {
    await service.createTodo('Todo 1');
    await service.createTodo('Todo 2');
    await service.createTodo('Todo 3');
    await service.toggleTodoState(1);
    await service.toggleTodoState(3);

    await service.removeAllCompletedTodos();

    service.getTodos$().subscribe(todos => {
      expect(todos.length).toBe(1);
      done();
    });
  });

  it('should sync all todo states', async (done) => {
    await service.createTodo('Todo 1');
    await service.createTodo('Todo 2');
    await service.createTodo('Todo 3');
    await service.toggleTodoState(1);
    await service.toggleTodoState(3);

    await service.syncAllTodoStates(false);

    service.getTodos$().subscribe(todos => {
      expect(todos.findIndex(t => t.completed)).toBe(-1);
      done();
    });
  });
});
