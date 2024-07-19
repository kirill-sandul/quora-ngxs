import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthController {
    private auth_service;
    constructor(auth_service: AuthService);
    register(create_user_dto: CreateUserDto, response: Response): Promise<Response<any, Record<string, any>>>;
    login(login_user_dto: LoginUserDto, response: Response): void;
}
