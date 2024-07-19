import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { AuthService } from '../../../shared/services/auth.service';
import { ILoginUser } from '../../../shared/interfaces/user.interface';
import { IReactiveFormField } from '../../../shared/interfaces/reactive-form-field.interface';
import { LoadingActions } from 'src/app/store/loading/loading.actions';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent {
  form_names: { [name: string]: string } = {
    login: 'логин',
    password: 'пароль'
  };
  form_schema: IReactiveFormField[] = [
    {
      name: 'login',
      label: 'Логин',
      value: '',
      validators: [Validators.required],
      appearance: 'standard'
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
  invalid: boolean = false;
  server_error: string = '';
  create_loading: boolean = false;
  
  constructor(
    private store: Store,
    private auth_service: AuthService,
    private router: Router
  ) {}
  
  handle_server_error(error: HttpErrorResponse) {
    const { message } = error.error;

    if (message) {
      this.create_loading = false;
      this.invalid = true;
      this.server_error = message;
      console.error('create-user', message);
    } else this.server_error = '';
  }

  created(res: ILoginUser) {
    this.create_loading = false;
    this.store.dispatch(new LoadingActions.Stop());

    const { user_id, token } = res;
    
    this.auth_service.sign_token(user_id!, token!);
    
    this.router.navigate(['']);
  }
  
  toggle_button(invalid: boolean){
    this.invalid = invalid;
  }

  submit(form: UntypedFormGroup) {
    const { login, password } = form.value;

    this.create_loading = true;

    this.store.dispatch(new LoadingActions.Set());

    this.auth_service.login_user({ login, password })
      .subscribe({
        next: this.created.bind(this),
        error: error => this.handle_server_error(error),
      });
  }
}
