import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

import { EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IQuestion } from './../../shared/interfaces/question.interface';
import { IReactiveFormField } from '../../shared/interfaces/reactive-form-field.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';

import { UserState } from 'src/app/store/user/user.state';
import { UserActions } from 'src/app/store/user/user.actions';
import { QsActions } from 'src/app/store/questions/questions.actions';

import { tags_control_validator } from '../../shared/tags.validator';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateQuestionComponent implements OnInit {
  user_data$: Observable<IUser> = this.store.selectOnce(UserState.select_user);
  placeholder: string = "Начните вопрос с \"Почему?\", \"Как?\", \"Из-за чего?\" ...";
  form_schema: IReactiveFormField[] = [
    {
      name: 'title',
      label: 'Название',
      value: '',
      validators: [Validators.required, Validators.minLength(5)],
      appearance: 'standard',
      class: 'field',
      placeholder: this.placeholder
    },
    {
      name: 'description',
      label: 'Описание',
      value: '',
      validators: [Validators.required, Validators.minLength(10)],
      type: 'textarea',
      class: 'field'
    },
    {
      name: 'tags',
      label: 'Тэги',
      value: [],
      validators: [tags_control_validator],
      type: 'tags',
      class: 'field'
    }
  ]
  form_names: { [name: string]: string } = {
    title: 'название',
    description: 'описание',
    tags: 'тэги'
  };
  invalid: boolean;
  create_loading: boolean = false;
  
  constructor(
    private store: Store,
    private router: Router
  ) {
    const saved_form = JSON.parse(localStorage.getItem('create-q-form-data')!);
    if (saved_form) this.form_schema.forEach(field => {
      field.value = saved_form[field.name];
    });
  }

  ngOnInit() {
    this.store.dispatch(new UserActions.Get());
  }

  save_form(form: UntypedFormGroup){    
    localStorage.setItem('create-q-form-data', JSON.stringify(form));
  }
  
  handle_error(error: HttpErrorResponse) {
    const { message } = error.error;

    if (message) {
      this.create_loading = false;
      console.error('create-question', message);
    }
  }

  created(created_q: IQuestion){
    this.create_loading = false;
    
    this.router.navigateByUrl(`/q/${created_q._id}`);
  }

  submit(form: UntypedFormGroup){
    const { title, description, tags } = form.value;

    localStorage.removeItem('create-q-form-data');

    this.create_loading = true;

    this.user_data$.pipe(
      mergeMap(user => {
        return this.store.dispatch(
          new QsActions.CreateQ({ autor_id: user._id, title, description, answers: [], tags })
        );
      }),
      mergeMap(({ questions }) => {
        this.created(questions.q);

        return EMPTY;
      })
    ).subscribe();
  }
}