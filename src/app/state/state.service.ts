import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export class StateService<T> {

  private stateSource: BehaviorSubject<T>;

  protected get state(): T {
    return this.stateSource.value;
  }

  protected getState(): Observable<T> {
    return this.stateSource;
  }

  protected setState(state: Partial<T>): void {
    this.stateSource.next({
      ...this.state,
      ...state
    });
  }

  constructor(initialState: T) {
    this.stateSource = new BehaviorSubject(initialState);
  }
}
