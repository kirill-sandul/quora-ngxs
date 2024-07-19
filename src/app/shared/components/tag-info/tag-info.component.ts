import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { UserState } from 'src/app/store/user/user.state';
import { UserActions } from 'src/app/store/user/user.actions';
import { TagsState } from 'src/app/store/tags/tags.state';
import { ITag } from '../../interfaces/tag.interface';

@Component({
  selector: 'app-tag-info',
  templateUrl: './tag-info.component.html',
  styleUrls: ['./tag-info.component.scss']
})
export class TagInfoComponent implements OnInit, OnChanges {
  @Input() tag: ITag;
  followed_tags$: Observable<ITag[]> = this.store.select(UserState.followed_tags);
  selected_tag$: Observable<ITag> = this.store.select(TagsState.selected_tag);
  followed$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loading: boolean;
  
  constructor(private store: Store) {}

  ngOnInit() {    
    this.is_followed();
  }

  ngOnChanges(){
    this.is_followed();
  }
  
  is_followed(){
    this.followed_tags$.pipe(
      take(1),
      map(followed_tags =>  {
        this.followed$.next(!!followed_tags?.filter(t => t.name === this.tag.name).length);
      })
    ).subscribe();
  }

  follow_tag(){
    this.followed$.next(true);
    this.loading = true;

    this.store.dispatch(new UserActions.FollowTag(this.tag)).subscribe(() => this.loading = false);
  }

  unfollow_tag(){
    this.followed$.next(false);
    this.loading = true;

    this.store.dispatch(new UserActions.UnfollowTag(this.tag)).subscribe(() => this.loading = false);
  }
}
