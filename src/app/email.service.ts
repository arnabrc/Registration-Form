// import {filter} from '@angular-devkit/schematics';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  checkEmailNotTaken(email: string) {
    return this.http
      .get('assets/data/email.json')
      .pipe(delay(1000))
      .pipe(map(res => res))
      .pipe(map((emails: Array<any>) => emails.filter(em => em.email === email)))
      .pipe(map(emails => !emails.length));
  }
}
