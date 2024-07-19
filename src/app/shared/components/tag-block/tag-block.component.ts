import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TagsState } from 'src/app/store/tags/tags.state';
import { TagsActions } from 'src/app/store/tags/tags.actions';
import { LoadingActions } from 'src/app/store/loading/loading.actions';
import { ITag } from '../../interfaces/tag.interface';

@Component({
  selector: 'app-tag-block',
  templateUrl: './tag-block.component.html',
  styleUrls: ['./tag-block.component.scss']
})
export class TagBlockComponent implements OnInit {
  tags$: Observable<ITag[]> = this.store.select(TagsState.tags);
  load_more_btn$: Observable<boolean> = this.store.select(TagsState.load_more_btn_state);
  load_more_btn_loading: boolean = false;

  constructor(private store: Store) {}
  
  ngOnInit() {
    this.store.dispatch(new LoadingActions.Set());
    this.store.dispatch(new TagsActions.SelectTags())
    .subscribe(() => this.store.dispatch(new LoadingActions.Stop()));
  }

  load_more() {
    this.load_more_btn_loading = true;

    this.store.dispatch(new TagsActions.SelectTags({ push: true }))
      .subscribe(() => this.load_more_btn_loading = false);
  }
}
