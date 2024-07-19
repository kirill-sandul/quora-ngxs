import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3, {
    message: 'Логин должен быть не меньше 3 символов'
  })
  login: string;

  @IsEmail({}, {
    message: 'Неверный адрес эл. почты'
  })
  email: string;

  @MinLength(8, {
    message: 'Пароль должен быть не меньше 8 символов'
  })
  password: string;
}