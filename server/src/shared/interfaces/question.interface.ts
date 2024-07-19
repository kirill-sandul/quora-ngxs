import { IQuestionAnswer } from "./answer.interface";
import { ITag } from './tag.interface';

export interface IQuestion {
  autor_id: string;
  title: string,
  description: string,
  date: Date,
  answers: IQuestionAnswer[],
  tags: ITag[]
}