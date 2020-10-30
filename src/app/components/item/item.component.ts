import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'todo-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit {

  @Input()
  todo: Todo | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
