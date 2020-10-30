import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'todo-item-list',
  templateUrl: './item-list.component.html',
})
export class ItemListComponent {

  @Input()
  todos: Todo[] = [];

}
