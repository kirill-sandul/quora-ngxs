import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ITag } from '../interfaces/tag.interface';
import { LoadingActions } from 'src/app/store/loading/loading.actions';

@Injectable({ providedIn: 'root' })
export class TagsService {
  tags: ITag[] = [];
  
  constructor(private http: HttpClient){}

  select(start_index: number, last_index: number, push?: boolean): Observable<{ selected: ITag[] }> {
    return this.http.get<{ selected: ITag[] }>(`http://localhost:3000/tag/select_tags`, {
      params: {
        start_index,
        last_index
      }
    })
  }

  add_tag(name: string, description: string){
    
    return this.http.post<{ new_tag: ITag}>('http://localhost:3000/tag/add', { name, description });
  }
}