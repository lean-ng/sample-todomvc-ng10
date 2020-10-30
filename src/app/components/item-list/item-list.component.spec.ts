import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Todo } from 'src/app/models/todo';

import { ItemListComponent } from './item-list.component';

@Component({
  selector: 'todo-item',
  template: '<span>A todo</span>'
})
class MockItemComponent {
  @Input() todo: Todo | undefined;
}

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemListComponent, MockItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the given count of todo items', () => {
    component.todos = [
      { id: 1, title: 'Item 1', completed: true },
      { id: 2, title: 'Item 2', completed: false },
    ];
    fixture.detectChanges();

    const todosDE = fixture.debugElement.queryAll(By.directive(MockItemComponent));
    expect(todosDE.length).toBe(2);
  });
});
