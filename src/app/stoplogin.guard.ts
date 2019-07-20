import {url} from '@angular-devkit/schematics';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StoploginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }
  canActivate() {
    if (!this.authService.isLoginLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
