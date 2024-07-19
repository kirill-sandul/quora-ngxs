import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { QsActions } from 'src/app/store/questions/questions.actions';
import { TagsActions } from 'src/app/store/tags/tags.actions';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  value: string = '';
  search_type: string = 'questions';

  constructor(private store: Store) {}

  filter(){
    if(this.search_type === 'questions') this.store.dispatch(new QsActions.Search(this.value));
    else if (this.search_type === 'tags') this.store.dispatch(new TagsActions.Search(this.value));
  }

  clear(){
    this.value = '';
    if (this.search_type === 'questions') this.store.dispatch(new QsActions.Search(''));
    else if (this.search_type === 'tags') this.store.dispatch(new TagsActions.Search(''));
  }
}
