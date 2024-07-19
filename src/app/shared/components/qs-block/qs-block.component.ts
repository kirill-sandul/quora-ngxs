import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Store } from '@ngxs/store';
import { IQuestion } from '../../interfaces/question.interface';
import { TagsState } from 'src/app/store/tags/tags.state';
import { QuestionsState } from '../../../store/questions/questions.state';
import { QsActions } from '../../../store/questions/questions.actions';
import { ITag } from '../../interfaces/tag.interface';
import { LoadingActions } from 'src/app/store/loading/loading.actions';

@Component({
  selector: 'app-qs-block',
  templateUrl: './qs-block.component.html',
  styleUrls: ['./qs-block.component.scss']
})
export class QsBlockComponent implements OnInit {
  @Input() search$: BehaviorSubject<string>;
  questions$: Observable<IQuestion[]> = this.store.select(QuestionsState.select_qs_list);
  load_more_btn$: Observable<boolean> = this.store.select(QuestionsState.load_more_btn_state);
  selected_tag$: Observable<ITag> = this.store.select(TagsState.selected_tag);

  load_more_btn_loading: boolean = false;

  constructor(private store: Store) {}

  ngOnInit(){
    this.store.dispatch(new LoadingActions.Set());
    this.store.dispatch(new QsActions.Select()).subscribe(() => {
      this.store.dispatch(new LoadingActions.Stop());
    });
  }

  load_more(){    
    this.load_more_btn_loading = true;
    
    this.selected_tag$.pipe(
      take(1),
      map(tag => {
        this.store.dispatch(new QsActions.Select({ tag_name: tag.name, push: true }))
        .subscribe(() => this.load_more_btn_loading = false);
      })
    ).subscribe();
  }
}
