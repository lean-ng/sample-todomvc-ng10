import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'todo-input',
  templateUrl: './input.component.html',
})
export class InputComponent {

  title = '';

  @Output()
  create = new EventEmitter<string>();

  createTodo(): void {
    const title = this.title.trim();
    if (title) {
      this.create.emit(title);
    }
    this.title = '';
  }
}
