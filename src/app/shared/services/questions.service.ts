import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  HttpRes,
  ICreateQuestion,
  IRemoveQuestion,
  IGetQuestion,
  IQuestion,
  IQuestionAnswer,
  IRemoveAnswer,
  IEditAnswer,
  IEditQuestion
} from '../interfaces/question.interface';
import { ICompareVerify } from '../interfaces/compare-verify.interface';

@Injectable({ providedIn: 'root' })
export class QuestionsService {
  constructor(private http: HttpClient) {}

  create_question(new_q: IQuestion): Observable<ICreateQuestion> {
    return this.http.post<ICreateQuestion>('http://localhost:3000/questions/create', new_q);
  }
  /**
    * @use select a group of all questions in db from start_index to last_index
    * @param push append questions from response to this.qs_list or reset
  */
  select(start_index: number, last_index: number, tag_name?: string){
    return this.http.get<{ selected: IQuestion[] }>(`http://localhost:3000/questions/select`, {
      params: {
        start_index,
        last_index,
        tag_name: tag_name || ''
      }
    });
  }
  
  // filter_by_tag(tag: ITag | undefined | null, list: IQuestion[]){
  //   const { loaded_qs_list } = this;

  //   if (!tag) return loaded_qs_list;
  //   return list.filter(q => q.tags.indexOf(tag.name) !== -1);
  // }

  edit_question(
    id: string, title: string, description: string, tags: string[], verify: ICompareVerify
  ): Observable<IEditQuestion> {
    return this.http.put<IEditQuestion>('http://localhost:3000/questions/edit', { id, title, description, tags, verify });
  }
    
  remove_question(id: string, verify: ICompareVerify): Observable<IRemoveQuestion> {    
    return this.http.delete<IRemoveQuestion>(`http://localhost:3000/questions/remove`, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        id, verify
      }
    });
  }

  get_question(id: string): Observable<IGetQuestion> {
    return this.http.get<IGetQuestion>(`http://localhost:3000/questions/get/${id}`);
  }

  add_answer(new_answer: IQuestionAnswer){
    return this.http.post<{ answers: IQuestionAnswer[] } & HttpRes>(`http://localhost:3000/questions/answer/create`,
      { ...new_answer }, 
      {
        headers: {
          'Content-Type': 'application/json'
      }
    });
  }

  edit_answer(q_id: string, answer_id: string, text: string, verify: ICompareVerify){
    return this.http.put<IEditAnswer>('http://localhost:3000/questions/answer/edit', { q_id, answer_id, text, verify });
  }

  remove_answer(q_id: string, answer_id: string, verify: ICompareVerify){
    return this.http.delete<IRemoveAnswer>('http://localhost:3000/questions/answer/remove', {
      headers: {
        'Content-Type': 'application/json'
      },
      body: { q_id, answer_id, verify }
    });
  }

  like_answer(voted_user_id: string, q_id: string, answer_id: string){
    return this.http.put<{ answers: IQuestionAnswer[] } & HttpRes>('http://localhost:3000/questions/answer/like', {
      voted_user_id,
      q_id,
      answer_id
    });
  }

  dislike_answer(voted_user_id: string, q_id: string, answer_id: string){
    return this.http.put<{ answers: IQuestionAnswer[] } & HttpRes>('http://localhost:3000/questions/answer/dislike', {
      voted_user_id,
      q_id,
      answer_id
    });
  }
}
