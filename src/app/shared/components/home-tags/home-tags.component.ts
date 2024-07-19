import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, map, take } from 'rxjs';
import { TagsState } from '../../../store/tags/tags.state';
import { UserState } from '../../../store/user/user.state';
import { UserActions } from '../../../store/user/user.actions';
import { ITag } from '../../interfaces/tag.interface';
import { TagsService } from '../../services/tags.service';
import { UserService } from '../../services/user.service';
import { TagsActions } from 'src/app/store/tags/tags.actions';
import { QsActions } from 'src/app/store/questions/questions.actions';
import { LoadingActions } from 'src/app/store/loading/loading.actions';

@Component({
  selector: 'app-home-tags',
  templateUrl: './home-tags.component.html',
  styleUrls: ['./home-tags.component.scss']
})
export class HomeTagsComponent implements OnInit {
  followed_tags$: Observable<ITag[]> = this.store.select(UserState.followed_tags);
  selected_tag$: Observable<ITag> = this.store.select(TagsState.selected_tag);
  
  constructor(
    public tags_service: TagsService,
    public user_service: UserService,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(new UserActions.LoadFollowedTags());
  }

  select_tag(name: string){
    this.store.dispatch(new LoadingActions.Set());

    this.store.dispatch(new TagsActions.SelectTag(name));
    
    this.store.dispatch(new QsActions.Select({ tag_name: name }))
      .subscribe(() => this.store.dispatch(new LoadingActions.Stop()));
  }
}
