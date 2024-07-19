import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import Cookies from 'js-cookie';

@Injectable()
export class HomePageGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate(): boolean {
    const user_token = Cookies.get('user-token');

    if(!user_token) {
      this.router.navigate(['/auth/register']);
      return false;
    }
    
    return true;
  }
}