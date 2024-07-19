import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import Cookies from 'js-cookie';

@Injectable()
export class AuthPageGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user_token = Cookies.get('user-token');
    
    if(state.url === '/auth') {
      this.router.navigate(['/auth/register']);
      return false;
    }

    if (user_token) {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }
}