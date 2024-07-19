import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { AuthService } from '../../../shared/services/auth.service';
import { ICreateUser } from '../../../shared/interfaces/user.interface';
import { IReactiveFormField } from '../../../shared/interfaces/reactive-form-field.interface';
import { LoadingActions } from 'src/app/store/loading/loading.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss'],
  providers: [AuthService]
})
export class AuthRegisterComponent {
  form_schema: IReactiveFormField[] = [
    {
      name: 'login',
      label: 'Логин',
      value: '',
      validators: [Validators.required],
      appearance: 'standard',
    },
    {
      name: 'email',
      label: 'Эл. почта',
      value: '',
      validators: [Validators.required, Validators.email],
      appearance: 'standard',
      type: 'email'
    },
    {
      name: 'password',
      label: 'Пароль',
      value: '',
      validators: [Validators.required, Validators.minLength(8)],
      appearance: 'standard',
      type: 'password'
    }
  ]
  form_names: { [name: string]: string } = {
    login: 'логин',
    email: 'эл. почту',
    password: 'пароль'
  };
  invalid: boolean = false;
  create_loading: boolean = false;
  
  constructor(
    private store: Store,
    private auth_service: AuthService,
    private router: Router
  ) {}

  handle_error(error: HttpErrorResponse){
    const { message } = error.error;

    if(message){
      this.create_loading = false;
      console.error('create-user', message);
    }
  }

  created(res: ICreateUser){
    this.create_loading = false;
    this.store.dispatch(new LoadingActions.Set());

    const { user_id, token } = res;

    this.auth_service.sign_token(user_id!, token!);
    
    this.router.navigate(['']);
  }

  toggle_button(invalid: boolean){
    this.invalid = invalid;
  }

  submit(form: UntypedFormGroup) {
    const { login, email, password } = form.value;
    
    this.create_loading = true;
    this.store.dispatch(new LoadingActions.Stop());

    this.auth_service.create_user({ _id: '', login, email, password })
    .subscribe({
      next: this.created.bind(this),
      error: error => this.handle_error(error),
    });
  }
}
