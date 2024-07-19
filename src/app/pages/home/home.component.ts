import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { AddTagWidgetComponent } from '../../shared/components/add-tag-widget/add-tag-widget.component';
import { QuestionsService } from '../../shared/services/questions.service';
import { TagsService } from '../../shared/services/tags.service';
import { UserService } from '../../shared/services/user.service';
import { SearchService } from '../../shared/components/search/search.service';
import { UserActions } from '../../store/user/user.actions';
import { TagsActions } from 'src/app/store/tags/tags.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {  
  constructor(
    public qs_service: QuestionsService,
    public user_service: UserService,
    public search_service: SearchService,
    public add_tag_widget: MatDialog,
    public snack_bar: MatSnackBar,
    private store: Store
  ) {}

  ngOnInit(){    
    const { user_service, store } = this;

    if (user_service.get_user_token()) store.dispatch(new UserActions.Get())
  }

  add_tag(){
    const dialog_ref = this.add_tag_widget.open(AddTagWidgetComponent, {
      width: '450px',
      maxHeight: '500px'
    });
    
    dialog_ref.afterClosed().subscribe((result) => {
      if(!result) return;

      const { name, description } = result;

      this.store.dispatch(new TagsActions.AddTag({ name, description })).subscribe(() => {
        this.snack_bar.open('Тэг был добавлен', 'Закрыть');
      });
    });
  }
}
