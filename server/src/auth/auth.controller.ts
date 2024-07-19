import { Controller, Post, Body, Res, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth_service: AuthService){}

  @Post('register')
  register(@Body() create_user_dto: CreateUserDto, @Res() response: Response) {
    return this.auth_service.create_user(create_user_dto, response);
  }

  @Post('login')
  login(@Body() login_user_dto: LoginUserDto, @Res() response: Response){
    this.auth_service.login_user(login_user_dto, response);
  }
}
