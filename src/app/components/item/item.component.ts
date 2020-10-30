import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'todo-item',
  templateUrl: './item.component.html'
})
export class ItemComponent {

  @Input()
  todo: Todo | undefined;

  @Output()
  toggle = new EventEmitter<void>();

  @Output()
  destroy = new EventEmitter<void>();

}
