import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Cookies from 'js-cookie';
import { IUser, ICreateUser, ILoginUser } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient
  ){}
  
  create_user(user: IUser): Observable<ICreateUser> {
    // const http_options = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   })
    // }

    return this.http
      .post<ICreateUser>('http://localhost:3000/auth/register', user, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  }

  login_user(user_data: ILoginUser){
    return this.http
      .post<ILoginUser>('http://localhost:3000/auth/login', user_data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  }

  logout_user(){
    Cookies.remove('user-id');
    Cookies.remove('user-token');
  }

  sign_token(id: string, token: string) {
    Cookies.set('user-id', id, { expires: 1 });
    Cookies.set('user-token', token, { expires: 1 });
  }
}