import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean | UrlTree {
      let url: string = state.url;
      return this.checkLogin(url);
  }

  checkLogin(url: string): true | UrlTree {
    console.log("Url: " + url);
    let val: any = localStorage.getItem('isUserLoggedIn');

    if(val != null && val == "true") {
      if(url == "/login")
        this.router.parseUrl('/');
      else return true;
    }
    return this.router.parseUrl('/login');
  }
  
}
