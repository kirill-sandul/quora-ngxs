import { Model } from 'mongoose';
import { Response } from 'express';
import { UserDocument } from '../shared/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthService {
    private user_model;
    constructor(user_model: Model<UserDocument>);
    create_user(create_user_dto: CreateUserDto, response: Response): Promise<Response<any, Record<string, any>>>;
    login_user(login_user_dto: LoginUserDto, response: Response): Promise<Response<any, Record<string, any>>>;
}
