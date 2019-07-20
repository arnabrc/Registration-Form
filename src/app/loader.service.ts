import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { LoaderState } from './loader/loader';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {
  public isLoading = new BehaviorSubject(false);
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  constructor() { }
  show() {
    this.isLoading = new BehaviorSubject(true);
    this.loaderSubject.next({ show: true } as LoaderState);
    document.getElementById('spinner-overlay').style.display = 'block';
  }
  hide() {
    this.isLoading = new BehaviorSubject(false);
    this.loaderSubject.next({ show: false } as LoaderState);
    document.getElementById('spinner-overlay').style.display = 'none';
  }
}
