import {url} from '@angular-devkit/schematics';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    // const sessionValue = sessionStorage.getItem('LoggedInUser');
    const sessionValue = sessionStorage.getItem('LogInUser');
    // if (this.authService.isLoggedIn && sessionValue !== null) {
    if (this.authService.isLoginLoggedIn && sessionValue !== null) {
      console.log('RouteGuardGuard');
      return true;
      // this.router.navigate(['/dashboard']);
    } else {
      // return this.router.parseUrl('/registration');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
