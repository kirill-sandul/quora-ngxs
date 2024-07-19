import { MinLength } from 'class-validator';

export class LoginUserDto {
  @MinLength(3, {
    message: 'Логин должен быть не меньше 3 символов'
  })
  login: string;

  @MinLength(8, {
    message: 'Пароль должен быть не меньше 8 символов'
  })
  password: string;
}