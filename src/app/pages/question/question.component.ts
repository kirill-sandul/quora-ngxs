import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { map, switchMap, EMPTY, Observable, finalize } from 'rxjs';
import { QuestionsState } from '../../store/questions/questions.state';
import { UserState } from '../../store/user/user.state';
import { LoadingState } from 'src/app/store/loading/loading.state';
import { QsActions } from '../../store/questions/questions.actions';
import { UserActions } from '../../store/user/user.actions';
import { LoadingActions } from 'src/app/store/loading/loading.actions';
import { IQuestion, IQuestionAnswer } from './../../shared/interfaces/question.interface';
import { IUser } from '../../shared/interfaces/user.interface';
import { QuestionsService } from './../../shared/services/questions.service';
import { UserService } from './../../shared/services/user.service';
import { AddAnswerWidgetComponent } from '../../shared/components/add-answer-widget/add-answer-widget.component';
import { EditAnswerWidgetComponent } from '../../shared/components/edit-answer-widget/edit-answer-widget.component';
import { EditQuestionWidgetComponent } from '../../shared/components/edit-question-widget/edit-question-widget.component';
import Cookies from 'js-cookie';
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  // animations: [
  //   trigger('fade', [
  //     state('true', style({
  //       opacity: '0'
  //     })),
  //     state('false', style({
  //       opacity: '1'
  //     })),
  //     transition('* => *', animate('200ms'))
  //   ])
  // ]
})
export class QuestionComponent {
  q_id: string;
  question: IQuestion;

  question$: Observable<IQuestion> = this.store.select(QuestionsState.select_q)
  question_once$: Observable<IQuestion> = this.store.selectOnce(QuestionsState.select_q)
  user$: Observable<IUser> = this.store.selectOnce(UserState.select_user)
  loading$: Observable<boolean> = this.store.select(LoadingState.loading);
  
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private user_service: UserService,
    public questions_service: QuestionsService,
    public widget: MatDialog,
    public snack_bar: MatSnackBar
  ) {
    route.params.subscribe(params => {
      this.q_id = params['id'];
    });

    this.load();
  }
  
  load(){
    const { q_id } = this;

    this.store.dispatch(new LoadingActions.Set());
    
    this.store.dispatch(new UserActions.Get()).pipe(
      switchMap(() => this.store.dispatch(new QsActions.GetQ({ id: q_id }))),
      finalize(() => this.store.dispatch(new LoadingActions.Stop()))
    ).subscribe();
  }

  modify_answer(answer: IQuestionAnswer){
    const modified = {...answer};
    
    this.user_service.get_user(answer.autor!._id)
      .subscribe(res => {
        const autor = res.user;
        modified.autor = autor;
      });
      
    return modified;
  }

  req_verify(autor_id: string) {
    return {
      submitter_id: this.user_service.get_user_id()!,
      autor_id
    }
  }

  dialog(component: ComponentType<unknown>, defaults: any, on_first_map: Function, on_second_map?: Function){
    const dialog_ref = this.widget.open(component, {
      width: '450px',
      maxHeight: '500px',
      data: defaults
    });

    dialog_ref.afterClosed().pipe(
      switchMap((data) => {
        if (!data) return EMPTY;

        return on_first_map(data);
      }),
      map(() => {
        if(on_second_map) on_second_map()
      })
    ).subscribe();
  }
  
  add_answer(){
    this.user$.pipe(
      switchMap(user => {
        return this.question_once$.pipe(
          map(q => {
            const answer_autor_id = user._id!;
            
            const answer = {
              q_id: q._id!,
              autor_id: answer_autor_id,
              text: '',
              votes: {
                likes: 0,
                dislikes: 0
              },
              date: new Date()
            };
            
            this.dialog(
              AddAnswerWidgetComponent,
              { text: '' },
              (data: any) => {
                this.store.dispatch(new LoadingActions.Set());
                const add_answer_action = this.store.dispatch(
                  new QsActions.AddAnswer({
                    ...answer,
                    autor: { _id: '', login: '', },
                    text: data.text,
                    votes: { liked_by: [], disliked_by: [] }
                  })
                )
                add_answer_action.subscribe(() => this.store.dispatch(new LoadingActions.Stop()));

                return add_answer_action;
              },
              () => this.snack_bar.open('Ответ был добавлен', 'Закрыть')
            )
          })
        )
      })
    ).subscribe();
  }

  edit_answer(answer: IQuestionAnswer){
    this.question_once$.pipe(
      map(q =>
        this.dialog(
          EditAnswerWidgetComponent,
          { text: answer.text },
          (data: any) => this.store.dispatch(
            new QsActions.EditAnswer({
              q_id: q._id!, answer_id: answer.id!, text: data.text, verify: this.req_verify(answer.autor!._id)
            })),
            () => this.snack_bar.open('Ответ был обновлен', 'Закрыть')
          )
      )
    ).subscribe();
  }
  
  remove_answer(answer: IQuestionAnswer){
    this.question_once$.pipe(
      map(q => {
        this.store.dispatch(
          new QsActions.RemoveAnswer({ q_id: q._id!, answer_id: answer.id!, verify: this.req_verify(answer.autor._id) })
        ).subscribe(() => this.snack_bar.open('Ответ был удален', 'Закрыть'))
      })
    ).subscribe();
  }
  
  edit_question(){
    this.question_once$.pipe(
      map(q => {
        this.dialog(
          EditQuestionWidgetComponent,
          { title: q.title, description: q.description, tags: q.tags },
          (edit_data: any) => {
            const { title, description, tags } = edit_data;
            
            this.store.dispatch(new LoadingActions.Set());

            const edit_q_action = this.store.dispatch(
              new QsActions.EditQ({ id: q._id!, title, description, tags, verify: this.req_verify(q.autor_id) })
            )
            edit_q_action.subscribe(() => this.store.dispatch(new LoadingActions.Stop()));

            return edit_q_action;
          },
          () => this.snack_bar.open('Вопрос был обновлен', 'Закрыть')
        )
      })
    ).subscribe();
  }

  remove_question(){
    this.question_once$.pipe(
      switchMap(q => {
        return this.store.dispatch(
          new QsActions.RemoveQ({ id: q._id!, verify: this.req_verify(q.autor_id) })
        )
      }),
      switchMap(() => this.router.navigateByUrl('/')),
    ).subscribe();
  }

  like_answer(answer_id: string){
    this.question_once$.pipe(
      switchMap(({ _id }) => {
        const q_id = _id!;

        return this.user$.pipe(
          switchMap(({ _id: user_id }) => {
            const voted_user_id = user_id!;

            return this.store.dispatch(new QsActions.LikeAnswer({ voted_user_id, q_id, answer_id }));
          })
        )
      })
    ).subscribe();
  }

  dislike_answer(answer_id: string) {
    this.question_once$.pipe(
      switchMap(({ _id }) => {
        const q_id = _id!;

        return this.user$.pipe(
          switchMap(({ _id: user_id }) => {
            const voted_user_id = user_id!;

            return this.store.dispatch(new QsActions.DislikeAnswer({ voted_user_id, q_id, answer_id }));
          })
        )
      })
    ).subscribe();
  }

  user_compare(user_to_compare_id: string) {
    const current_user_id = Cookies.get('user-id');

    if (user_to_compare_id !== current_user_id) return false;

    return true;
  }
}
