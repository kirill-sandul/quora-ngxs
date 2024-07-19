import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from 'express';
import { User, UserDocument } from '../shared/schemas/user.schema';
import { config } from '../config/default';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private user_model: Model<UserDocument>){}

  async create_user(create_user_dto: CreateUserDto, response: Response){
    const { login, email, password } = create_user_dto;
    let err_message: string = '';

    const same_user_login = await this.user_model.findOne({ login });
    const same_user_email = await this.user_model.findOne({ email });


    if (same_user_login) err_message = 'Пользователь с таким логином уже существует';
    else if (same_user_email) err_message = 'Пользователь с таким адресом эл. почты уже существует';

    if(err_message) return response.status(HttpStatus.BAD_REQUEST).json({ message: err_message });

    const hashed_password = await bcrypt.hash(password, 12);
    let created_user = new this.user_model({ ...create_user_dto, password: hashed_password });
    created_user = await created_user.save();

    const token: string = jwt.sign({ id: created_user._id }, config.jwt_secret, { expiresIn: '1d' });

    return response
    // .cookie('user_token', token, { httpOnly: true, secure: true })
    .status(HttpStatus.CREATED)
    .json({ message: 'Пользователь создан', user_id: created_user._id, token });
  }

  async login_user(login_user_dto: LoginUserDto, response: Response){
    const { login, password } = login_user_dto;

    const logged_user = await this.user_model.findOne({ login });
    if(!logged_user) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Пользователь не найден' });
    }

    const is_password_match = await bcrypt.compare(password, logged_user.password);
    if(!is_password_match) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Неверный пароль' });
    }

    const token: string = jwt.sign({ id: logged_user._id }, config.jwt_secret, { expiresIn: '1d' });

    return response
      .status(HttpStatus.CREATED)
      .json({ message: 'Зарегистрирован', user_id: logged_user._id, token });
  }
}
