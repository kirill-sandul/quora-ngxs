import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import Cookies from 'js-cookie';
import { IUser } from '../interfaces/user.interface';
import { ITag } from "../interfaces/tag.interface";
import { shared } from '../shared.observable';

@Injectable({ providedIn: 'root' })
export class UserService {  
  constructor(private http: HttpClient){}
    
  get_user_id(){
    return Cookies.get('user-id');
  }

  get_user_token(){
    return Cookies.get('user-token');
  }

  auth_header(){
    return `Bearer ${this.get_user_token()}`;
  }

  get_logged_user(): Observable<{ logged_user: IUser }> {
    return shared(this, this.http.get<{ logged_user: IUser }>(`http://localhost:3000/users/get`, {
      headers: {
        Auth: this.auth_header()
      }
    }));
  }

  load_followed_tags(): Observable<{ followed_tags: ITag[] }> {
    return this.http.get<{ followed_tags: ITag[] }>(`http://localhost:3000/users/get_followed_tags`, {
      headers: {
        Auth: this.auth_header()
      }
    });
  }

  get_user(id: string){
    return this.http.get<{ user: IUser }>(`http://localhost:3000/users/get-by-id/${id}/`);
  }

  follow_tag(tag: ITag) {
    return this.http.post<{ tag: ITag }>('http://localhost:3000/users/follow_tag',
      { tag_name: tag.name },
      {
        headers: {
          Auth: this.auth_header()
        }
      }
    );
  }

  unfollow_tag(tag: ITag){
    return this.http.delete<{ tag: ITag }>('http://localhost:3000/users/unfollow_tag', {
      body: {
        tag_name: tag.name 
      },
      headers: {
        Auth: this.auth_header()
      }
    });
  }
}