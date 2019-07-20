import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  // public isLoggedIn() {
    // return localStorage.getItem('isLoggedIn') !== null;
    /* if (localStorage.getItem('isLoggedIn') !== null) {
      console.log('AuthService');
      return true;
    }*/
    /*sendToken(token: string) {
      // localStorage.setItem('LoggedInUser', token);
      console.log('sendToken');
      sessionStorage.setItem('LoggedInUser', token);
    }
    getToken() {
      // return localStorage.getItem('LoggedInUser');
      console.log('getToken');
      return sessionStorage.getItem('LoggedInUser');
    }
    isLoggedIn() {
      console.log('isLoggedIn');
      return this.getToken() !== null;
    }*/
    sendLoginToken(token: string) {
      // localStorage.setItem('LoggedInUser', token);
      console.log('sendLoginToken');
      sessionStorage.setItem('LogInUser', token);
    }
    getLoginToken() {
      // return localStorage.getItem('LoggedInUser');
      console.log('getLoginToken');
      return sessionStorage.getItem('LogInUser');
    }
    isLoginLoggedIn() {
      console.log('LogInUser');
      return this.getLoginToken() !== null;
    }
    logout() {
      sessionStorage.removeItem('LogInUser');
      this.router.navigate(['/login']);
    }
  // }
}
