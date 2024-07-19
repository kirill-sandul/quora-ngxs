export interface IUser {
  _id: string;
  login: string;
  email: string;
  password: string;
  followings?: string[];
}

export interface ILoginUser {
  login: string;
  password: string;
  user_id?: string;
  token?: string;
}

export interface ICreateUser {
  message: string,
  user_id?: string,
  token?: string
}