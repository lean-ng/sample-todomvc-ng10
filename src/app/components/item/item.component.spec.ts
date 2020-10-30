import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Todo } from 'src/app/models/todo';

import { ItemComponent } from './item.component';

const mockTitle = 'Unit Tests';
const createMock = (title = mockTitle, completed = false): Todo => {
  const todo: Todo = { id: 17, title, completed };
  return Object.freeze(todo);
};

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.todo = createMock();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the todo title', () => {
    const labelEL: HTMLLabelElement = fixture.nativeElement.querySelector('label');
    expect(labelEL.textContent).toBe(mockTitle);
  });

  it('should set the checked state of the toggle checkbox', () => {
    const toggleEL: HTMLInputElement = fixture.nativeElement.querySelector('.toggle');
    expect(toggleEL.checked).toBeFalse();

    component.todo = createMock(mockTitle, true);
    fixture.detectChanges();
    expect(toggleEL.checked).toBeTrue();
  });

  it('should apply the completed class whether checked', () => {
    const liEL: HTMLLIElement = fixture.nativeElement.querySelector('li');
    expect(liEL.classList.contains('completed')).toBeFalse();

    component.todo = createMock(mockTitle, true);
    fixture.detectChanges();
    expect(liEL.classList.contains('completed')).toBeTrue();
  });

});
