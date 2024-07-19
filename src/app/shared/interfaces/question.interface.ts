import { IUser } from './user.interface';

export interface HttpRes {
  message: string;
}

export interface IQuestionAnswer {
  id?: string;
  q_id: string,
  autor: {
    _id: string,
    login: string
  },
  text: string,
  votes: {
    liked_by: string[],
    disliked_by: string[]
  },
  date: Date
}

export interface IQuestion {
  _id?: string;
  autor_id: string;
  title: string,
  description: string,
  answers: IQuestionAnswer[],
  date?: Date,
  tags: string[]
}

export interface IGetQuestion {
  message: string;
  selected_q: IQuestion;
}

export interface ICreateQuestion {
  message: string;
  created_q: IQuestion;
}

export interface IEditQuestion {
  message: string;
  edited_q: IQuestion;
}

export interface ILoadQuestions {
  message: string;
  all_q: IQuestion[];
}

export interface IRemoveQuestion {
  message: string;
  q_id: string;
}

export interface IEditAnswer {
  message: string;
  answers: IQuestionAnswer[];
}

export interface IRemoveAnswer {
  q_id: string;
  answer_index: number;
}

export interface IVoteAnswer {
  voted_user_id: string;
  q_id: string;
  answer_index: number;
  vote_type: string;
}