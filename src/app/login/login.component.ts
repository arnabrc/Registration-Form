import { Component, OnInit, ViewContainerRef, HostListener, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { map, filter } from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { JsonpCallbackContext } from '@angular/common/http/src/jsonp';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from '../auth.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  profileFormLogin: FormGroup;
  submitted = false;
  users: any;
  hasError = false;

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    if (!this.profileFormLogin.dirty || !this.profileFormLogin.touched || this.profileFormLogin.valid) {
      return true;
    } else {
      return false;
    }
  }

  constructor(public router: Router, public route: ActivatedRoute, private fb: FormBuilder,
              private auth: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.profileFormLogin = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')])],
      password: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Za-z0-9]{5,12}$')])],
      aliases: this.fb.array([
        this.fb.control('')
      ])
    });
    this.getContentJSON();
  }

  get email() { return this.profileFormLogin.get('email'); }
  get password() { return this.profileFormLogin.get('password'); }

  /*public getJSON(): Observable<any> {
    return this.http.get('./assets/data/NameEmailPassword.json');
  }*/

  onSubmit() {
    this.submitted = true;
    /*this.users.forEach(() => {
      if (JSON.stringify(this.users.email) === this.profileFormLogin.value.email) {
        console.log('success ' + JSON.stringify(this.users.email));
      } else {
        console.log('failure ' + JSON.stringify(this.users.email));
      }
    });*/

    // tslint:disable-next-line:forin
    for ( const i in this.users ) {
      const em1 = this.users[i].email;
      if ( em1 === this.profileFormLogin.value.email ) {
        console.log('success');
        if (this.profileFormLogin.valid) {
          this.auth.sendLoginToken(this.profileFormLogin.value.email);
          // localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/dashboard']);
        }
      } else {
        console.log('failure');
        this.hasError = true;
      }
    }

    /*this.users.forEach((key: any, val: any) => {
      key.index = val + 1;
      if (key.email === this.profileFormLogin.value.email) {
          console.log('Success');
        } else {
          console.log('fail');
        }
      });*/
    // this.isLoggedIn = true;
    // const isLoggedIn = 'true';
    // this.router.navigate(['/dashboard']);
    console.warn(this.profileFormLogin.value);
  }

  getContentJSON(): any {
    this.http.get('./assets/data/NameEmailPassword.json').subscribe(
      data => {
        this.users = data as string;
        console.log(JSON.stringify(this.users));
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }
}
