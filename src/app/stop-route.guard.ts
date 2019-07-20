import {url} from '@angular-devkit/schematics';
import { Injectable, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class StopRouteGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  canActivate() {
      // if (!this.authService.isLoggedIn()) {
      if (!this.authService.isLoginLoggedIn()) {
        return true;
      } else {
        this.router.navigate(['/dashboard']);
        return false;
      } /*else if (!this.authService.isLoginLoggedIn()) {
        return true;
      } else {
        this.router.navigate(['/dashboard']);
        return false;
      }*/
  }
}
