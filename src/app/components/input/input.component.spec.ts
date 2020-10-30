import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire the create event on entering a title', () => {
    const inputDE = fixture.debugElement.query(By.css('input'));
    const inputEL: HTMLInputElement = inputDE.nativeElement;
    spyOn(component.create, 'emit');

    inputEL.value = 'Creating todos';
    inputDE.triggerEventHandler('change', {});
    inputDE.triggerEventHandler('keyup.enter', {});

    expect(component.create.emit).toHaveBeenCalledWith('Creating todos');
  });

  it('should trim the entered title', () => {
    const inputDE = fixture.debugElement.query(By.css('input'));
    const inputEL: HTMLInputElement = inputDE.nativeElement;
    spyOn(component.create, 'emit');

    inputEL.value = '  Creating todos ';
    inputDE.triggerEventHandler('change', {});
    inputDE.triggerEventHandler('keyup.enter', {});

    expect(component.create.emit).toHaveBeenCalledWith('Creating todos');
  });

  it('should not fire the create event on empty titles', () => {
    const inputDE = fixture.debugElement.query(By.css('input'));
    const inputEL: HTMLInputElement = inputDE.nativeElement;
    spyOn(component.create, 'emit');

    inputEL.value = '';
    inputDE.triggerEventHandler('change', {});
    inputDE.triggerEventHandler('keyup.enter', {});

    expect(component.create.emit).not.toHaveBeenCalled();
  });

});
